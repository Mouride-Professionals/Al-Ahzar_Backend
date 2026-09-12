"use strict";

/**
 * bank-transaction controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { resolveFinanceAccessContext } = require("../../../utils/finance-access");

module.exports = createCoreController("api::bank-transaction.bank-transaction", ({ strapi }) => ({
  async stats(ctx) {
    try {
      const accessContext = await resolveFinanceAccessContext(
        strapi,
        ctx.state.user?.id
      );

      if (!accessContext) {
        return ctx.forbidden("Forbidden");
      }

      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();

      const startOfYear = new Date(currentYear, 0, 1);
      const startOfNextYear = new Date(currentYear + 1, 0, 1);

      const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
      const startOfNextMonth = new Date(currentYear, currentMonth + 1, 1);

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

      const filters = ctx.query.filters || {};
      const requestedSchoolId = filters.school?.id?.$eq;
      const schoolYearId = filters.schoolYear?.id?.$eq;
      const schoolId =
        accessContext.scope === "school" ? accessContext.schoolId : requestedSchoolId;

      const knex = strapi.db.connection;
      const baseQuery = knex("bank_transactions");

      // Same rationale as expense.stats: a school year is the real period
      // scope, calendar-year filtering is only a fallback for when no
      // school year is selected.
      const applyPeriod = (query, dateColumn) => {
        if (schoolYearId) {
          return query;
        }

        return query.where(dateColumn, ">=", startOfYear).andWhere(dateColumn, "<", startOfNextYear);
      };

      const applyFilters = (query) => {
        if (schoolYearId || schoolId) {
          query
            .join(
              "bank_transactions_school_year_links",
              "bank_transactions.id",
              "bank_transactions_school_year_links.bank_transaction_id"
            )
            .join(
              "bank_transactions_school_links",
              "bank_transactions.id",
              "bank_transactions_school_links.bank_transaction_id"
            );
        }
        if (schoolId) {
          query.andWhere("bank_transactions_school_links.school_id", schoolId);
        }
        if (schoolYearId) {
          query.where("bank_transactions_school_year_links.school_year_id", schoolYearId);
        }
        return query;
      };

      const queries = {
        yearTransactionTotal: applyFilters(
          applyPeriod(baseQuery.clone(), "bank_transactions.transaction_date")
        )
          .sum({ total: "bank_transactions.amount" })
          .first(),

        currentMonthTransactionTotal: applyFilters(
          baseQuery
            .clone()
            .where("bank_transactions.transaction_date", ">=", startOfCurrentMonth)
            .andWhere("bank_transactions.transaction_date", "<", startOfNextMonth)
        )
          .sum({ total: "bank_transactions.amount" })
          .first(),

        previousMonthTransactionTotal: applyFilters(
          baseQuery
            .clone()
            .where("bank_transactions.transaction_date", ">=", startOfPrevMonth)
            .andWhere("bank_transactions.transaction_date", "<", startOfCurrentMonthForPrev)
        )
          .sum({ total: "bank_transactions.amount" })
          .first(),
      };

      const monthlyBreakdownQuery = applyFilters(
        applyPeriod(baseQuery.clone(), "bank_transactions.transaction_date")
      )
        .groupByRaw(
          "EXTRACT(YEAR FROM bank_transactions.transaction_date)::INTEGER, EXTRACT(MONTH FROM bank_transactions.transaction_date)::INTEGER, bank_transactions.type"
        )
        .select(
          knex.raw("EXTRACT(YEAR FROM bank_transactions.transaction_date)::INTEGER AS year"),
          knex.raw("EXTRACT(MONTH FROM bank_transactions.transaction_date)::INTEGER AS month"),
          "bank_transactions.type as type"
        )
        .sum({ total: "bank_transactions.amount" });

      const typeBreakdownQuery = applyFilters(
        applyPeriod(baseQuery.clone(), "bank_transactions.transaction_date")
      )
        .groupBy("bank_transactions.type")
        .select("bank_transactions.type as type")
        .sum({ total: "bank_transactions.amount" });

      const results = await Promise.all([
        ...Object.values(queries),
        monthlyBreakdownQuery,
        typeBreakdownQuery,
      ]);

      const [
        yearTransactionRes,
        currentMonthTransactionRes,
        previousMonthTransactionRes,
        monthlyBreakdown,
        typeBreakdown,
      ] = results;

      const extractTotal = (res) => {
        if (!res || res.total === null || res.total === undefined) return 0;
        return parseFloat(res.total) || 0;
      };

      ctx.send({
        yearTransactionTotal: extractTotal(yearTransactionRes),
        currentMonthTransactionTotal: extractTotal(currentMonthTransactionRes),
        previousMonthTransactionTotal: extractTotal(previousMonthTransactionRes),
        monthlyBreakdown: monthlyBreakdown.map((row) => ({
          month: row.month,
          year: row.year,
          type: row.type,
          total: extractTotal(row),
        })),
        totalByType: typeBreakdown.reduce((acc, row) => {
          acc[row.type] = extractTotal(row);
          return acc;
        }, {}),
      });
    } catch (error) {
      console.error("Error in bank-transaction stats endpoint:", error);
      ctx.throw(500, error.message);
    }
  },
}));
