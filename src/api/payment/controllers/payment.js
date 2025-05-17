"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::payment.payment", ({ strapi }) => ({
    async stats(ctx) {
        try {
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
            const schoolId = filters.school?.id?.$eq;

            // Use knex for aggregation queries
            const knex = strapi.db.connection;

            // Base query on the payments table
            const baseQuery = knex("payments");

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
                    console.log("schoolId", schoolId);

                    query.andWhere("classes_school_links.school_id", schoolId);
                }
                return query;
            };

            // Build the aggregation queries using the base query and filters
            const queries = {
                yearPaymentTotal: applyFilters(
                    baseQuery
                        .clone()
                        .where("payments.month_of", ">=", startOfYear)
                        .andWhere("payments.month_of", "<", startOfNextYear)
                )
                    .sum({ total: "payments.amount" })
                    .first(),

                currentMonthPaymentTotal: applyFilters(
                    baseQuery
                        .clone()
                        .where({ "payments.payment_type": "monthly" })
                        .andWhere("payments.month_of", ">=", startOfCurrentMonth)
                        .andWhere("payments.month_of", "<", startOfNextMonth)
                )
                    .sum({ total: "payments.amount" })
                    .first(),

                previousMonthPaymentTotal: applyFilters(
                    baseQuery
                        .clone()
                        .where({ "payments.payment_type": "monthly" })
                        .andWhere("payments.month_of", ">=", startOfPrevMonth)
                        .andWhere("payments.month_of", "<", startOfCurrentMonthForPrev)
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
            };

            // New query: Monthly breakdown for the current year.
            // Groups payments by month
            const monthlyBreakdownQuery = applyFilters(
                baseQuery
                    .clone()
                    .where("payments.month_of", ">=", startOfYear)
                    .andWhere("payments.month_of", "<", startOfNextYear)
            )
                .groupByRaw("EXTRACT(MONTH FROM payments.month_of)")
                .select(knex.raw("EXTRACT(MONTH FROM payments.month_of) AS month"))
                .sum({ total: "payments.amount" });

            // New query: Group payments by payment_type for the current year.
            const paymentTypeBreakdownQuery = applyFilters(
                baseQuery
                    .clone()
                    .where("payments.created_at", ">=", startOfYear)
                    .andWhere("payments.created_at", "<", startOfNextYear)
            )
                .groupBy("payments.payment_type")
                .select("payments.payment_type as paymentType")
                .sum({ total: "payments.amount" });

            const results = await Promise.all([
                ...Object.values(queries),
                monthlyBreakdownQuery,
                paymentTypeBreakdownQuery,
            ]);

            const [
                yearPaymentRes,
                currentMonthPaymentRes,
                previousMonthPaymentRes,
                enrollmentPaymentRes,
                monthlyPaymentRes,
                monthlyBreakdown,
                paymentTypeBreakdown,
            ] = results;

            // Function to ensure the sum is a number (or 0)
            const extractTotal = (res) => Number(res.total) || 0;

            ctx.send({
                yearPaymentTotal: extractTotal(yearPaymentRes),
                currentMonthPaymentTotal: extractTotal(currentMonthPaymentRes),
                previousMonthPaymentTotal: extractTotal(previousMonthPaymentRes),
                enrollmentPaymentTotal: extractTotal(enrollmentPaymentRes),
                monthlyPaymentTotal: extractTotal(monthlyPaymentRes),
                // monthlyBreakdown: an array of objects { month: X, total: Y }
                monthlyBreakdown: monthlyBreakdown.map((row) => ({
                    month: row.month,
                    total: extractTotal(row),
                })),
                // paymentTypeBreakdown: an array of objects { paymentType: X, total: Y }
                paymentTypeBreakdown: paymentTypeBreakdown.map((row) => ({
                    paymentType: row.paymentType,
                    total: extractTotal(row),
                })),
            });
        } catch (error) {
            console.error("Error in stats endpoint:", error);
            ctx.throw(500, error.message);
        }
    },
}));