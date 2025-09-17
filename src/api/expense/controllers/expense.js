"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::expense.expense", ({ strapi }) => ({
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

      // Retrieve filters from query string
      // Example: ?filters[school][id][$eq]=10&filters[schoolYear][id][$eq]=6
      const filters = ctx.query.filters || {};
      const schoolId = filters.school?.id?.$eq;
      const schoolYearId = filters.schoolYear?.id?.$eq;

      // Use knex for aggregation queries
      const knex = strapi.db.connection;

      // Base query on the expenses table
      const baseQuery = knex("expenses");

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
        yearExpenseTotal: applyFilters(
          baseQuery
            .clone()
            .where("expenses.expense_date", ">=", startOfYear)
            .andWhere("expenses.expense_date", "<", startOfNextYear)
        )
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

      // Monthly breakdown for the current year
      const monthlyBreakdownQuery = applyFilters(
        baseQuery
          .clone()
          .where("expenses.expense_date", ">=", startOfYear)
          .andWhere("expenses.expense_date", "<", startOfNextYear)
      )
        .groupByRaw("EXTRACT(MONTH FROM expenses.expense_date)::INTEGER")
        .select(knex.raw("EXTRACT(MONTH FROM expenses.expense_date)::INTEGER AS month"))
        .sum({ total: "expenses.amount" });

      // Category breakdown for the current year
      const categoryBreakdownQuery = applyFilters(
        baseQuery
          .clone()
          .where("expenses.expense_date", ">=", startOfYear)
          .andWhere("expenses.expense_date", "<", startOfNextYear)
      )
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
