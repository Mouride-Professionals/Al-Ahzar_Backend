"use strict";

const { createCoreController } = require("@strapi/strapi").factories;
const { resolveFinanceAccessContext } = require("../../../utils/finance-access");

async function buildExpenseReference(strapi, schoolYearId) {
  if (!schoolYearId) {
    return undefined;
  }

  const schoolYear = await strapi.db.query("api::school-year.school-year").findOne({
    where: { id: schoolYearId },
    select: ["startDate"],
  });

  if (!schoolYear) {
    return undefined;
  }

  const yearLabel = new Date(schoolYear.startDate).getFullYear();
  const prefix = `EXP-${yearLabel}-`;

  const lastExpense = await strapi.db.query("api::expense.expense").findOne({
    where: { reference: { $startsWith: prefix } },
    orderBy: { reference: "desc" },
    select: ["reference"],
  });

  const lastSequence = lastExpense
    ? Number.parseInt(lastExpense.reference.slice(prefix.length), 10)
    : 0;
  const nextSequence = String(lastSequence + 1).padStart(6, "0");

  return `${prefix}${nextSequence}`;
}

module.exports = createCoreController("api::expense.expense", ({ strapi }) => ({
  async create(ctx) {
    const data = ctx.request.body?.data || ctx.request.body;

    if (!data.reference) {
      data.reference = await buildExpenseReference(strapi, data.schoolYear);
    }

    try {
      await strapi.service("api::expense.expense").validateExpense(data);
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    const entity = await strapi.entityService.create("api::expense.expense", {
      data,
      populate: ["school", "schoolYear"],
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body?.data || ctx.request.body;

    try {
      await strapi.service("api::expense.expense").validateExpense(data, { expenseId: id });
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    const entity = await strapi.entityService.update("api::expense.expense", id, {
      data,
      populate: ["school", "schoolYear"],
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
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

      // Retrieve filters from query string
      // Example: ?filters[school][id][$eq]=10&filters[schoolYear][id][$eq]=6
      const filters = ctx.query.filters || {};
      const requestedSchoolId = filters.school?.id?.$eq;
      const schoolYearId = filters.schoolYear?.id?.$eq;
      const schoolId =
        accessContext.scope === "school" ? accessContext.schoolId : requestedSchoolId;

      // Use knex for aggregation queries
      const knex = strapi.db.connection;

      // Base query on the expenses table
      const baseQuery = knex("expenses");

      // "Annual" aggregates are scoped to a school year, not a calendar year.
      // When a schoolYearId is provided, applyFilters() below already restricts
      // rows to that school year via a relational join — that's the correct
      // scope and needs no extra date filter (an expense recorded just before
      // the term's official start date still belongs to that school year). The
      // expense_date window is only a fallback for the rare case where no
      // school year is selected at all, to avoid summing all-time data.
      const applyPeriod = (query, dateColumn) => {
        if (schoolYearId) {
          return query;
        }

        return query.where(dateColumn, ">=", startOfYear).andWhere(dateColumn, "<", startOfNextYear);
      };

      // Helper function to apply relationship filters
      const applyFilters = (query) => {
        if (schoolYearId || schoolId) {
          query
            .join(
              "expenses_school_year_links",
              "expenses.id",
              "expenses_school_year_links.expense_id"
            )
            .join(
              'school_years',
              'expenses_school_year_links.school_year_id',
              'school_years.id'

            ).join(
              "expenses_school_links",
              "expenses.id",
              "expenses_school_links.expense_id"
            )

        }
        if (schoolId) {
          query.andWhere("expenses_school_links.school_id", schoolId);
        }
        if (schoolYearId) {
          query.where("expenses_school_year_links.school_year_id", schoolYearId);
        }
        return query;
      };

      // Build the aggregation queries using the base query and filters
      const queries = {
        yearExpenseTotal: applyFilters(applyPeriod(baseQuery.clone(), "expenses.expense_date"))
          .sum({ total: "expenses.amount" })
          .first(),

        currentMonthExpenseTotal: applyFilters(
          baseQuery
            .clone()
            .where("expenses.expense_date", ">=", startOfCurrentMonth)
            .andWhere("expenses.expense_date", "<", startOfNextMonth)
        )
          .sum({ total: "expenses.amount" })
          .first(),

        previousMonthExpenseTotal: applyFilters(
          baseQuery
            .clone()
            .where("expenses.expense_date", ">=", startOfPrevMonth)
            .andWhere("expenses.expense_date", "<", startOfCurrentMonthForPrev)
        )
          .sum({ total: "expenses.amount" })
          .first(),



      };

      // Monthly breakdown for the school year. Groups by calendar year + month,
      // since a school year spans two calendar years (e.g. Oct 2026 - Jul 2027)
      // and a bare month number would be ambiguous between them.
      const monthlyBreakdownQuery = applyFilters(applyPeriod(baseQuery.clone(), "expenses.expense_date"))
        .groupByRaw(
          "EXTRACT(YEAR FROM expenses.expense_date)::INTEGER, EXTRACT(MONTH FROM expenses.expense_date)::INTEGER"
        )
        .select(
          knex.raw("EXTRACT(YEAR FROM expenses.expense_date)::INTEGER AS year"),
          knex.raw("EXTRACT(MONTH FROM expenses.expense_date)::INTEGER AS month")
        )
        .sum({ total: "expenses.amount" });

      // Category breakdown for the school year
      const categoryBreakdownQuery = applyFilters(applyPeriod(baseQuery.clone(), "expenses.expense_date"))
        .groupBy("expenses.category")
        .select("expenses.category as category")
        .sum({ total: "expenses.amount" });

      const results = await Promise.all([
        ...Object.values(queries),
        monthlyBreakdownQuery,
        categoryBreakdownQuery,
      ]);

      const [
        yearExpenseRes,
        currentMonthExpenseRes,
        previousMonthExpenseRes,
        monthlyBreakdown,
        categoryBreakdown,
      ] = results;

      // Function to ensure the sum is a number (or 0) - PostgreSQL compatible
      const extractTotal = (res) => {
        if (!res || res.total === null || res.total === undefined) return 0;
        // Handle PostgreSQL decimal/numeric types
        return parseFloat(res.total) || 0;
      };

      // Response object
      ctx.send({
        yearExpenseTotal: extractTotal(yearExpenseRes),
        currentMonthExpenseTotal: extractTotal(currentMonthExpenseRes),
        previousMonthExpenseTotal: extractTotal(previousMonthExpenseRes),
        monthlyBreakdown: monthlyBreakdown.map((row) => ({
          month: row.month,
          total: extractTotal(row),
          year: row.year,
        })),
        totalByCategory: categoryBreakdown.reduce((acc, row) => {
          acc[row.category] = extractTotal(row);
          return acc;
        }, {}),
      });
    } catch (error) {
      console.error("Error in expense stats endpoint:", error);
      ctx.throw(500, error.message);
    }
  },
}));
