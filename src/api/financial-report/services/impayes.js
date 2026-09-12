'use strict';

const PAYMENT_TYPES = ['enrollment', 'monthly', 'exam', 'blouse', 'parentContribution', 'other'];

function monthsBetweenInclusive(start, end) {
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  return Math.max(months, 0);
}

/**
 * Computes cumulative outstanding balances (Impayés) as of `periodEnd`.
 *
 * SETTLED DECISION: computed only for `socialStatus = 'Non'` enrollments.
 * Cas-sociaux enrollments (Réduction inscription/mensualité, Tout tarifs
 * offerts) are permanently excluded — these discounts are negotiated
 * case-by-case per family, there is no fixed percentage stored anywhere
 * to compute an "expected amount" against. They're surfaced separately as
 * `casSociauxExcludedCount` instead of being folded into a guessed total.
 *
 * ASSUMPTION (flagged, not silently invented — verify against real
 * accounting practice before trusting these figures): fee-schedule's
 * `monthly` rate is treated as accruing once per distinct calendar month
 * from the school year's start date through `periodEnd` inclusive (e.g.
 * whether vacation months should accrue is not encoded anywhere and is
 * assumed here to follow the same monthly cadence the legacy manual
 * report already uses for Recettes). Every other paymentType (enrollment,
 * exam, blouse, parentContribution, other) is treated as a one-time
 * expected amount, not repeated per month.
 *
 * KNOWN LIMITATION: fee-schedule's `level` enum is a strict subset of
 * class's `level` enum (missing "Préparatoire", "Spécial 1-4"). Enrollments
 * in those levels will have no matching fee-schedule row and contribute 0
 * to `expectedTotal`, silently under-counting impayés for those classes
 * until fee-schedule is extended to cover them.
 */
async function computeImpayes({ strapi, schoolId, schoolYearId, schoolYearStartDate, periodEnd }) {
  const knex = strapi.db.connection;

  const activeEnrollmentQuery = () =>
    knex('enrollments')
      .join('enrollments_class_links', 'enrollments.id', 'enrollments_class_links.enrollment_id')
      .join('classes', 'enrollments_class_links.class_id', 'classes.id')
      .join(
        'classes_school_links',
        'enrollments_class_links.class_id',
        'classes_school_links.class_id'
      )
      .join(
        'enrollments_school_year_links',
        'enrollments.id',
        'enrollments_school_year_links.enrollment_id'
      )
      .where('classes_school_links.school_id', schoolId)
      .andWhere('enrollments_school_year_links.school_year_id', schoolYearId)
      .andWhere('enrollments.enrollment_date', '<', periodEnd)
      .andWhere(function () {
        this.whereNot('enrollments.status', 'withdrawn').orWhere(
          'enrollments.withdrawal_date',
          '>=',
          periodEnd
        );
      });

  const extractCount = (res) => (res ? parseInt(res.count, 10) || 0 : 0);

  const [enrollments, casSociauxExcludedRow] = await Promise.all([
    activeEnrollmentQuery()
      .andWhere('enrollments.social_status', 'Non')
      .select('enrollments.id as enrollmentId', 'classes.cycle as cycle', 'classes.level as level'),

    activeEnrollmentQuery()
      .andWhereNot('enrollments.social_status', 'Non')
      .count({ count: '*' })
      .first(),
  ]);

  const casSociauxExcludedCount = extractCount(casSociauxExcludedRow);

  if (enrollments.length === 0) {
    return {
      expectedTotal: 0,
      paidTotal: 0,
      balance: 0,
      casSociauxExcludedCount,
      enrollmentCount: 0,
    };
  }

  const enrollmentIds = enrollments.map((e) => e.enrollmentId);

  const [feeScheduleRows, paidRows] = await Promise.all([
    strapi.db.query('api::fee-schedule.fee-schedule').findMany({
      where: { school: schoolId, schoolYear: schoolYearId },
      select: ['cycle', 'level', 'paymentType', 'amount'],
    }),

    knex('payments')
      .join('payments_enrollment_links', 'payments.id', 'payments_enrollment_links.payment_id')
      .whereIn('payments_enrollment_links.enrollment_id', enrollmentIds)
      .andWhereNot('payments.status', 'cancelled')
      .andWhere('payments.created_at', '<', periodEnd)
      .groupBy('payments_enrollment_links.enrollment_id', 'payments.payment_type')
      .select(
        'payments_enrollment_links.enrollment_id as enrollmentId',
        'payments.payment_type as paymentType'
      )
      .sum({ total: 'payments.amount' }),
  ]);

  const feeScheduleMap = new Map();
  for (const row of feeScheduleRows) {
    feeScheduleMap.set(`${row.cycle}|${row.level}|${row.paymentType}`, parseFloat(row.amount) || 0);
  }

  const paidMap = new Map();
  for (const row of paidRows) {
    paidMap.set(
      `${row.enrollmentId}|${row.paymentType}`,
      row.total === null || row.total === undefined ? 0 : parseFloat(row.total) || 0
    );
  }

  const monthsElapsed = monthsBetweenInclusive(new Date(schoolYearStartDate), new Date(periodEnd));

  let expectedTotal = 0;
  let paidTotal = 0;

  for (const enrollment of enrollments) {
    for (const paymentType of PAYMENT_TYPES) {
      const rate = feeScheduleMap.get(`${enrollment.cycle}|${enrollment.level}|${paymentType}`);
      if (rate === undefined) continue;

      expectedTotal += paymentType === 'monthly' ? rate * monthsElapsed : rate;
      paidTotal += paidMap.get(`${enrollment.enrollmentId}|${paymentType}`) || 0;
    }
  }

  return {
    expectedTotal,
    paidTotal,
    balance: Math.max(expectedTotal - paidTotal, 0),
    casSociauxExcludedCount,
    enrollmentCount: enrollments.length,
  };
}

module.exports = { computeImpayes };
