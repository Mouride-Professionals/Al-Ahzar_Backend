"use strict";

const { createCoreController } = require("@strapi/strapi").factories;
const { resolveFinanceAccessContext } = require("../../../utils/finance-access");

async function buildPaymentReference(strapi, enrollmentId) {
  if (!enrollmentId) {
    return undefined;
  }

  const enrollment = await strapi.db.query("api::enrollment.enrollment").findOne({
    where: { id: enrollmentId },
    populate: ["schoolYear"],
  });

  const schoolYear = enrollment?.schoolYear;

  if (!schoolYear) {
    return undefined;
  }

  const yearLabel = new Date(schoolYear.startDate).getFullYear();
  const prefix = `PAY-${yearLabel}-`;

  const lastPayment = await strapi.db.query("api::payment.payment").findOne({
    where: { reference: { $startsWith: prefix } },
    orderBy: { reference: "desc" },
    select: ["reference"],
  });

  const lastSequence = lastPayment
    ? Number.parseInt(lastPayment.reference.slice(prefix.length), 10)
    : 0;
  const nextSequence = String(lastSequence + 1).padStart(6, "0");

  return `${prefix}${nextSequence}`;
}

module.exports = createCoreController("api::payment.payment", ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;

    if (!data.reference) {
      data.reference = await buildPaymentReference(strapi, data.enrollment);
    }

    return super.create(ctx);
  },

  async stats(ctx) {
    try {
      const accessContext = await resolveFinanceAccessContext(
        strapi,
        ctx.state.user?.id
      );

      if (!accessContext) {
        return ctx.forbidden("Forbidden");
      }

      // Get current date info
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth(); // 0-indexed

      // Define date boundaries for current year
      const startOfYear = new Date(currentYear, 0, 1);
      const startOfNextYear = new Date(currentYear + 1, 0, 1);

      // Define boundaries for current month
      const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
      const startOfNextMonth = new Date(currentYear, currentMonth + 1, 1);

      // Define boundaries for previous month
      let prevMonth, prevYear;
      if (currentMonth === 0) {
        prevMonth = 11;
        prevYear = currentYear - 1;
      } else {
        prevMonth = currentMonth - 1;
        prevYear = currentYear;
      }
      const startOfPrevMonth = new Date(prevYear, prevMonth, 1);
      const startOfCurrentMonthForPrev = new Date(prevYear, prevMonth + 1, 1);

      // Retrieve filters from query string:
      // For instance: ?filters[schoolYear][id][$eq]=6&filters[school][id][$eq]=10
      const filters = ctx.query.filters || {};
      const schoolYearId = filters.schoolYear?.id?.$eq;
      const requestedSchoolId = filters.school?.id?.$eq;
      const schoolId =
        accessContext.scope === "school" ? accessContext.schoolId : requestedSchoolId;

      // Use knex for aggregation queries
      const knex = strapi.db.connection;

      // Base query on the payments table - EXCLUDE CANCELLED PAYMENTS
      const baseQuery = knex("payments").whereNot("payments.status", "cancelled");

      // "Annual" aggregates are scoped to a school year, not a calendar year.
      // When a schoolYearId is provided, applyFilters() below already restricts
      // rows to that school year's enrollments via a relational join — that's
      // the correct scope and needs no extra date filter (a payment made just
      // before the term's official start date still belongs to that school
      // year). The created_at date window is only a fallback for the rare case
      // where no school year is selected at all, to avoid summing all-time data.
      const applyPeriod = (query, dateColumn) => {
        if (schoolYearId) {
          return query;
        }

        return query.where(dateColumn, ">=", startOfYear).andWhere(dateColumn, "<", startOfNextYear);
      };

      // Helper function to apply relationship filters.
      // Assumes Strapi relationships are organized as:
      // payments -> payments_enrollment_links -> enrollments ->
      // enrollments_school_year_links & enrollments_class_links -> classes_school_links
      const applyFilters = (query) => {
        if (schoolYearId || schoolId) {
          query
            .join(
              "payments_enrollment_links",
              "payments.id",
              "payments_enrollment_links.payment_id"
            )
            .join("enrollments", "payments_enrollment_links.enrollment_id", "enrollments.id")
            .join(
              "enrollments_school_year_links",
              "enrollments.id",
              "enrollments_school_year_links.enrollment_id"
            )
            .join(
              "enrollments_class_links",
              "enrollments.id",
              "enrollments_class_links.enrollment_id"
            )
            .join(
              "classes_school_links",
              "enrollments_class_links.class_id",
              "classes_school_links.class_id"
            );
        }
        if (schoolYearId) {
          query.andWhere("enrollments_school_year_links.school_year_id", schoolYearId);
        }
        if (schoolId) {
          query.andWhere("classes_school_links.school_id", schoolId);
        }
        return query;
      };

      // Build the aggregation queries using the base query and filters
      const queries = {
        yearPaymentTotal: applyFilters(applyPeriod(baseQuery.clone(), "payments.created_at"))
          .sum({ total: "payments.amount" })
          .first(),

        currentMonthPaymentTotal: applyFilters(
          baseQuery
            .clone()
            .where({ "payments.payment_type": "monthly" })
            .andWhere("payments.created_at", ">=", startOfCurrentMonth)
            .andWhere("payments.created_at", "<", startOfNextMonth)
        )
          .sum({ total: "payments.amount" })
          .first(),

        previousMonthPaymentTotal: applyFilters(
          baseQuery
            .clone()
            .where({ "payments.payment_type": "monthly" })
            .andWhere("payments.created_at", ">=", startOfPrevMonth)
            .andWhere("payments.created_at", "<", startOfCurrentMonthForPrev)
        )
          .sum({ total: "payments.amount" })
          .first(),

        enrollmentPaymentTotal: applyFilters(
          baseQuery.clone().where({ "payments.payment_type": "enrollment" })
        )
          .sum({ total: "payments.amount" })
          .first(),

        monthlyPaymentTotal: applyFilters(
          baseQuery.clone().where({ "payments.payment_type": "monthly" })
        )
          .sum({ total: "payments.amount" })
          .first(),

        // New queries for cancelled payment insights
        cancelledPaymentsTotal: applyFilters(
          applyPeriod(
            knex("payments").clone().where("payments.status", "cancelled"),
            "payments.created_at"
          )
        )
          .sum({ total: "payments.amount" })
          .first(),

        cancelledPaymentsCount: applyFilters(
          applyPeriod(
            knex("payments").clone().where("payments.status", "cancelled"),
            "payments.created_at"
          )
        )
          .count({ count: "*" })
          .first(),

        pendingPaymentsTotal: applyFilters(
          baseQuery.clone().where("payments.status", "pending")
        )
          .sum({ total: "payments.amount" })
          .first(),

        pendingPaymentsCount: applyFilters(
          baseQuery.clone().where("payments.status", "pending")
        )
          .count({ count: "*" })
          .first(),

        // Distinct enrollments that paid their monthly fee this month.
        // Always joins payments_enrollment_links (unlike applyFilters, which only
        // joins it when a school/schoolYear filter is present) since we need
        // enrollment_id for the DISTINCT count regardless of scoping.
        currentMonthMonthlyPayersCount: (() => {
          const query = baseQuery
            .clone()
            .where({ "payments.payment_type": "monthly" })
            .andWhere("payments.created_at", ">=", startOfCurrentMonth)
            .andWhere("payments.created_at", "<", startOfNextMonth)
            .join(
              "payments_enrollment_links",
              "payments.id",
              "payments_enrollment_links.payment_id"
            );

          if (schoolYearId) {
            query
              .join(
                "enrollments_school_year_links",
                "payments_enrollment_links.enrollment_id",
                "enrollments_school_year_links.enrollment_id"
              )
              .andWhere("enrollments_school_year_links.school_year_id", schoolYearId);
          }

          if (schoolId) {
            query
              .join(
                "enrollments_class_links",
                "payments_enrollment_links.enrollment_id",
                "enrollments_class_links.enrollment_id"
              )
              .join(
                "classes_school_links",
                "enrollments_class_links.class_id",
                "classes_school_links.class_id"
              )
              .andWhere("classes_school_links.school_id", schoolId);
          }

          return query
            .countDistinct({ count: "payments_enrollment_links.enrollment_id" })
            .first();
        })(),
      };

      // New query: Monthly breakdown for the school year.
      // Groups payments by calendar year + month, since a school year spans
      // two calendar years (e.g. Oct 2026 - Jul 2027) and a bare month number
      // would be ambiguous between them.
      const monthlyBreakdownQuery = applyFilters(applyPeriod(baseQuery.clone(), "payments.created_at"))
        .groupByRaw(
          "EXTRACT(YEAR FROM payments.created_at)::INTEGER, EXTRACT(MONTH FROM payments.created_at)::INTEGER"
        )
        .select(
          knex.raw("EXTRACT(YEAR FROM payments.created_at)::INTEGER AS year"),
          knex.raw("EXTRACT(MONTH FROM payments.created_at)::INTEGER AS month")
        )
        .sum({ total: "payments.amount" });

      // New query: Group payments by payment_type for the school year.
      const paymentTypeBreakdownQuery = applyFilters(applyPeriod(baseQuery.clone(), "payments.created_at"))
        .groupBy("payments.payment_type")
        .select("payments.payment_type as paymentType")
        .sum({ total: "payments.amount" });

      // Group payments by status for the school year
      const statusBreakdownQuery = applyFilters(
        applyPeriod(knex("payments").clone(), "payments.created_at")
      )
        .groupBy("payments.status")
        .select("payments.status as status")
        .sum({ total: "payments.amount" })
        .count({ count: "*" });

      const results = await Promise.all([
        ...Object.values(queries),
        monthlyBreakdownQuery,
        paymentTypeBreakdownQuery,
        statusBreakdownQuery,
      ]);

      const [
        yearPaymentRes,
        currentMonthPaymentRes,
        previousMonthPaymentRes,
        enrollmentPaymentRes,
        monthlyPaymentRes,
        cancelledPaymentsTotalRes,
        cancelledPaymentsCountRes,
        pendingPaymentsTotalRes,
        pendingPaymentsCountRes,
        currentMonthMonthlyPayersCountRes,
        monthlyBreakdown,
        paymentTypeBreakdown,
        statusBreakdown,
      ] = results;

      // Function to ensure the sum is a number (or 0) - PostgreSQL compatible
      const extractTotal = (res) => {
        if (!res || res.total === null || res.total === undefined) return 0;
        // Handle PostgreSQL decimal/numeric types
        return parseFloat(res.total) || 0;
      };

      // Function to extract count
      const extractCount = (res) => {
        if (!res || res.count === null || res.count === undefined) return 0;
        return parseInt(res.count) || 0;
      };

      ctx.send({
        // Main financial totals (EXCLUDING cancelled payments)
        yearPaymentTotal: extractTotal(yearPaymentRes),
        currentMonthPaymentTotal: extractTotal(currentMonthPaymentRes),
        previousMonthPaymentTotal: extractTotal(previousMonthPaymentRes),
        enrollmentPaymentTotal: extractTotal(enrollmentPaymentRes),
        monthlyPaymentTotal: extractTotal(monthlyPaymentRes),

        // Cancelled payments insights
        cancelledPaymentsTotal: extractTotal(cancelledPaymentsTotalRes),
        cancelledPaymentsCount: extractCount(cancelledPaymentsCountRes),

        // Pending payments insights
        pendingPaymentsTotal: extractTotal(pendingPaymentsTotalRes),
        pendingPaymentsCount: extractCount(pendingPaymentsCountRes),

        // Distinct enrollments that paid their monthly fee this month
        currentMonthMonthlyPayersCount: extractCount(currentMonthMonthlyPayersCountRes),

        // Breakdown by month (excluding cancelled)
        monthlyBreakdown: monthlyBreakdown.map((row) => ({
          month: row.month,
          total: extractTotal(row),
          year: row.year,
        })),

        // Breakdown by payment type (excluding cancelled)
        paymentTypeBreakdown: paymentTypeBreakdown.map((row) => ({
          paymentType: row.paymentType,
          total: extractTotal(row),
        })),

        // Breakdown by status (all payments)
        statusBreakdown: statusBreakdown.map((row) => ({
          status: row.status,
          total: extractTotal(row),
          count: extractCount(row),
        })),
      });
    } catch (error) {
      console.error("Error in stats endpoint:", error);
      ctx.throw(500, error.message);
    }
  },
}));
