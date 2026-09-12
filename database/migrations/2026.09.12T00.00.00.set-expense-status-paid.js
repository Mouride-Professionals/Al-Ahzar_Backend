'use strict';

/**
 * Migration: backfill status = 'paid' for expenses predating the field.
 *
 * Context: `status` (paid/cancelled) was added to the expense schema to
 * support cancel-with-reason, mirroring how payment cancellation already
 * works. Strapi does not apply a schema `default` retroactively to existing
 * rows, so every expense created before this migration would otherwise have
 * status = NULL.
 */

module.exports = {
  async up(knex) {
    if (!(await knex.schema.hasColumn('expenses', 'status'))) {
      console.log('[migration] No expense status column found — skipping.');
      return;
    }

    const updated = await knex('expenses')
      .whereNull('status')
      .update({ status: 'paid' });

    console.log(`[migration] Set status = 'paid' on ${updated} expense(s).`);
  },

  async down(knex) {
    if (!(await knex.schema.hasColumn('expenses', 'status'))) {
      console.log('[migration] No expense status column found — nothing to revert.');
      return;
    }

    await knex('expenses').update({ status: null });
    console.log('[migration] Reverted status to NULL for all expenses.');
  },
};
