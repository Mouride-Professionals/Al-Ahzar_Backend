'use strict';

/**
 * Migration: backfill status = 'active' for enrollments predating the field.
 *
 * Context: `status` (active/withdrawn/completed) was added to the enrollment
 * schema after the project went to production, to support the financial
 * report's "abandons" (dropout) tracking. Strapi does not apply a schema
 * `default` retroactively to existing rows, so every enrollment created
 * before this migration would otherwise have status = NULL.
 */

module.exports = {
  async up(knex) {
    let statusColumn = null;

    if (await knex.schema.hasColumn('enrollments', 'status')) {
      statusColumn = 'status';
    } else {
      console.log('[migration] No enrollment status column found — skipping.');
      return;
    }

    const updated = await knex('enrollments')
      .whereNull(statusColumn)
      .update({ [statusColumn]: 'active' });

    console.log(
      `[migration] Set ${statusColumn} = 'active' on ${updated} enrollment(s).`,
    );
  },

  async down(knex) {
    if (!(await knex.schema.hasColumn('enrollments', 'status'))) {
      console.log('[migration] No enrollment status column found — nothing to revert.');
      return;
    }

    await knex('enrollments').update({ status: null });
    console.log('[migration] Reverted status to NULL for all enrollments.');
  },
};
