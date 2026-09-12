'use strict';

/**
 * Shared period-range resolution for the financial report.
 *
 * Deliberate simplification: `periodType` only determines the RANGE being
 * reported on (one month / one quarter / one semester / the full school
 * year / an arbitrary custom range) — it does NOT determine the breakdown
 * granularity. Breakdown buckets (see buildMonthlyBreakdown) are always
 * monthly, reusing the exact EXTRACT(YEAR)/EXTRACT(MONTH) SQL pattern
 * already proven in payment.stats/expense.stats, rather than introducing
 * separate quarter/semester SQL groupings. A "quarterly report" is simply
 * up to 3 monthly bars over a 3-month range; a "semester report" is up to 6.
 */

const PERIOD_TYPES = ['month', 'quarter', 'semester', 'year', 'custom'];

function startOfMonth(year, monthIndex0) {
  return new Date(year, monthIndex0, 1);
}

function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
}

function exclusiveEnd(date) {
  return new Date(date.getTime() + 24 * 60 * 60 * 1000);
}

/**
 * Resolves a caller-supplied period selection into a concrete [from, to)
 * date range. `to` is always exclusive, matching the >= / < convention
 * already used by payment.stats / expense.stats.
 */
function resolvePeriodRange({
  periodType,
  year,
  month, // 1-12, required for periodType === 'month'
  quarter, // 1-4, required for periodType === 'quarter'
  semester, // 1-2, required for periodType === 'semester'
  from,
  to,
  schoolYearStartDate,
  schoolYearEndDate,
}) {
  if (!PERIOD_TYPES.includes(periodType)) {
    throw new Error(`Unknown periodType: ${periodType}`);
  }

  const yearStart = schoolYearStartDate ? new Date(schoolYearStartDate) : null;
  const yearEnd = schoolYearEndDate ? new Date(schoolYearEndDate) : null;
  const yearEndExclusive = yearEnd ? exclusiveEnd(yearEnd) : null;

  if (periodType === 'custom') {
    if (!from || !to) {
      throw new Error('periodType "custom" requires both from and to.');
    }
    return { from: new Date(from), to: new Date(to) };
  }

  if (periodType === 'year') {
    if (yearStart && yearEndExclusive) {
      return { from: yearStart, to: yearEndExclusive };
    }
    const y = year || new Date().getFullYear();
    return { from: startOfMonth(y, 0), to: startOfMonth(y + 1, 0) };
  }

  if (periodType === 'month') {
    if (!year || !month) {
      throw new Error('periodType "month" requires year and month.');
    }
    return { from: startOfMonth(year, month - 1), to: startOfMonth(year, month) };
  }

  if (periodType === 'quarter') {
    if (!quarter) {
      throw new Error('periodType "quarter" requires quarter (1-4).');
    }
    const base = yearStart || startOfMonth(year || new Date().getFullYear(), 0);
    const start = addMonths(base, (quarter - 1) * 3);
    let end = addMonths(base, quarter * 3);
    if (yearEndExclusive && end > yearEndExclusive) {
      end = yearEndExclusive;
    }
    return { from: start, to: end };
  }

  if (periodType === 'semester') {
    if (!semester) {
      throw new Error('periodType "semester" requires semester (1-2).');
    }
    const base = yearStart || startOfMonth(year || new Date().getFullYear(), 0);
    const start = addMonths(base, (semester - 1) * 6);
    let end = addMonths(base, semester * 6);
    if (yearEndExclusive && end > yearEndExclusive) {
      end = yearEndExclusive;
    }
    return { from: start, to: end };
  }
}

/** Applies a [from, to) window to a knex query builder on the given date column. */
function applyDateRange(query, dateColumn, { from, to }) {
  return query.where(dateColumn, '>=', from).andWhere(dateColumn, '<', to);
}

/**
 * Returns a groupByRaw-ready monthly breakdown query, cloned from `query`,
 * for the given date column — the shared building block behind every
 * section's "breakdown by month" output.
 */
function buildMonthlyBreakdown(knex, query, dateColumn) {
  return query
    .clone()
    .groupByRaw(
      `EXTRACT(YEAR FROM ${dateColumn})::INTEGER, EXTRACT(MONTH FROM ${dateColumn})::INTEGER`
    )
    .select(
      knex.raw(`EXTRACT(YEAR FROM ${dateColumn})::INTEGER AS year`),
      knex.raw(`EXTRACT(MONTH FROM ${dateColumn})::INTEGER AS month`)
    );
}

module.exports = {
  PERIOD_TYPES,
  resolvePeriodRange,
  applyDateRange,
  buildMonthlyBreakdown,
};
