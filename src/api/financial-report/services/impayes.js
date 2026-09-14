'use strict';

const PAYMENT_TYPES = ['enrollment', 'monthly', 'exam', 'blouse', 'parentContribution', 'other'];

function monthsBetweenInclusive(start, end) {
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
  return Math.max(months, 0);
}

/**
 * Resolves the expected amount for one enrollment/paymentType pair, honoring
 * per-family negotiated cas-sociaux rates.
 *
 * REVISED DECISION (supersedes the earlier "cas-sociaux permanently excluded"
 * design): every enrollment with a non-`Non` `socialStatus` already carries
 * its own negotiated `customEnrollmentFee`/`customMonthlyFee` on the
 * enrollment record (set via the Social Status dialog on the front end), so
 * there IS a real per-family amount to compute against — it just isn't the
 * standard fee-schedule rate. Cas-sociaux enrollments are therefore included
 * in Impayés like any other enrollment, using this resolution order:
 *  - `enrollment` type: "Tout tarifs offerts" → 0; "Réduction inscription" →
 *    `customEnrollmentFee` if set, else the fee-schedule `reducedEnrollment`
 *    rate, else the normal `enrollment` rate; anything else → normal rate.
 *  - `monthly` type: "Tout tarifs offerts" OR "Réduction inscription" → 0 —
 *    confirmed business rule: "Réduction inscription" means a reduced
 *    one-time enrollment fee AND full exemption from monthly fees for the
 *    rest of the year, not just a discounted enrollment fee with monthly
 *    fees still due (matches `isMonthlyFeeWaived` in the frontend's
 *    `payment-rules.ts`, which already disables monthly payment collection
 *    for this status — this function used to disagree with that and expect
 *    a full monthly rate, which was the actual bug). "Réduction mensualité"
 *    → `customMonthlyFee` if set, else the fee-schedule `reducedMonthly`
 *    rate, else the normal `monthly` rate; anything else → normal rate.
 *  - All other payment types (exam, blouse, parentContribution, other): no
 *    override field exists on the enrollment, so the normal fee-schedule
 *    rate always applies regardless of socialStatus.
 *
 * ASSUMPTION (flagged, not silently invented — verify against real
 * accounting practice before trusting these figures): fee-schedule's
 * `monthly` (and `reducedMonthly`) rate is treated as accruing once per
 * distinct calendar month from the school year's start date through
 * `periodEnd` inclusive (e.g. whether vacation months should accrue is not
 * encoded anywhere and is assumed here to follow the same monthly cadence
 * the legacy manual report already uses for Recettes). Every other
 * paymentType is treated as a one-time expected amount, not repeated per
 * month.
 */
function resolveExpectedRate({ enrollment, paymentType, feeScheduleMap }) {
  const { cycle, level, socialStatus, customEnrollmentFee, customMonthlyFee } = enrollment;
  const normalRate = feeScheduleMap.get(`${cycle}|${level}|${paymentType}`);

  if (paymentType === 'enrollment') {
    if (socialStatus === 'Tout tarifs offerts') return 0;
    if (socialStatus === 'Réduction inscription') {
      if (customEnrollmentFee !== null && customEnrollmentFee !== undefined) {
        return parseFloat(customEnrollmentFee) || 0;
      }
      const reducedRate = feeScheduleMap.get(`${cycle}|${level}|reducedEnrollment`);
      return reducedRate !== undefined ? reducedRate : normalRate;
    }
    return normalRate;
  }

  if (paymentType === 'monthly') {
    if (socialStatus === 'Tout tarifs offerts' || socialStatus === 'Réduction inscription') {
      return 0;
    }
    if (socialStatus === 'Réduction mensualité') {
      if (customMonthlyFee !== null && customMonthlyFee !== undefined) {
        return parseFloat(customMonthlyFee) || 0;
      }
      const reducedRate = feeScheduleMap.get(`${cycle}|${level}|reducedMonthly`);
      return reducedRate !== undefined ? reducedRate : normalRate;
    }
    return normalRate;
  }

  return normalRate;
}

/**
 * Computes cumulative outstanding balances (Impayés) as of `periodEnd`,
 * across all active enrollments including cas-sociaux (see
 * `resolveExpectedRate` above for how their negotiated rates are resolved).
 *
 * KNOWN LIMITATION: fee-schedule's `level` enum matches class's `level`
 * enum as of the fee-schedule module (no coverage gap today) — if new class
 * levels are ever added without a matching fee-schedule entry, those
 * enrollments will contribute 0 to `expectedTotal`, silently under-counting
 * impayés for those classes.
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

  const enrollments = await activeEnrollmentQuery().select(
    'enrollments.id as enrollmentId',
    'classes.cycle as cycle',
    'classes.level as level',
    'enrollments.social_status as socialStatus',
    'enrollments.custom_enrollment_fee as customEnrollmentFee',
    'enrollments.custom_monthly_fee as customMonthlyFee'
  );

  const casSociauxCount = enrollments.filter((e) => e.socialStatus !== 'Non').length;

  if (enrollments.length === 0) {
    return {
      expectedTotal: 0,
      paidTotal: 0,
      balance: 0,
      casSociauxCount,
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
      const rate = resolveExpectedRate({ enrollment, paymentType, feeScheduleMap });
      if (rate === undefined) continue;

      expectedTotal += paymentType === 'monthly' ? rate * monthsElapsed : rate;
      paidTotal += paidMap.get(`${enrollment.enrollmentId}|${paymentType}`) || 0;
    }
  }

  return {
    expectedTotal,
    paidTotal,
    balance: Math.max(expectedTotal - paidTotal, 0),
    casSociauxCount,
    enrollmentCount: enrollments.length,
  };
}

module.exports = { computeImpayes };
