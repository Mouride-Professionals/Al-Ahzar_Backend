'use strict';

/**
 * Effectifs (enrollment counts) for the financial report.
 *
 * `total`/`casSociaux` are snapshots "as of period end" (an enrollment
 * counts if it started before periodTo and was not withdrawn before
 * periodTo) — matching the same "cumulative as of period end" convention
 * used for Impayés. `abandons` is different: it counts withdrawals that
 * actually happened *during* the selected period (periodFrom <= date <
 * periodTo), since a dropout is an event, not a standing balance.
 */
async function computeEffectifs({ strapi, schoolId, schoolYearId, periodFrom, periodTo }) {
  const knex = strapi.db.connection;

  const baseQuery = () =>
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
      .andWhere('enrollments_school_year_links.school_year_id', schoolYearId);

  const activeAsOfPeriodEnd = (query) =>
    query.andWhere('enrollments.enrollment_date', '<', periodTo).andWhere(function () {
      this.whereNot('enrollments.status', 'withdrawn').orWhere(
        'enrollments.withdrawal_date',
        '>=',
        periodTo
      );
    });

  const extractCount = (res) => (res ? parseInt(res.count, 10) || 0 : 0);

  const [totalRow, casSociauxRow, abandonsRow, byCycleLevel] = await Promise.all([
    activeAsOfPeriodEnd(baseQuery()).count({ count: '*' }).first(),

    activeAsOfPeriodEnd(baseQuery())
      .andWhereNot('enrollments.social_status', 'Non')
      .count({ count: '*' })
      .first(),

    baseQuery()
      .andWhere('enrollments.status', 'withdrawn')
      .andWhere('enrollments.withdrawal_date', '>=', periodFrom)
      .andWhere('enrollments.withdrawal_date', '<', periodTo)
      .count({ count: '*' })
      .first(),

    activeAsOfPeriodEnd(baseQuery())
      .groupBy('classes.cycle', 'classes.level')
      .select('classes.cycle as cycle', 'classes.level as level')
      .count({ count: '*' }),
  ]);

  return {
    total: extractCount(totalRow),
    casSociaux: extractCount(casSociauxRow),
    abandons: extractCount(abandonsRow),
    byCycleLevel: byCycleLevel.map((row) => ({
      cycle: row.cycle,
      level: row.level,
      count: extractCount(row),
    })),
  };
}

module.exports = { computeEffectifs };
