'use strict';

/**
 * Migration: set isConfirmed = true for enrollments that already have payments.
 *
 * Context: isConfirmed was added to the enrollment schema after the project
 * went to production. All existing enrollments with at least one payment record
 * are considered confirmed and must be marked accordingly so that:
 *   1. The cashier UI does not show a "confirm enrollment" button for them.
 *   2. The safe-delete endpoint correctly blocks deletion of confirmed students.
 */

module.exports = {
  async up(knex) {
    let ids = [];
    let confirmationColumn = null;

    if (await knex.schema.hasColumn('enrollments', 'is_confirmed')) {
      confirmationColumn = 'is_confirmed';
    } else if (await knex.schema.hasColumn('enrollments', 'isConfirmed')) {
      confirmationColumn = 'isConfirmed';
    } else {
      console.log('[migration] No enrollment confirmation column found — skipping.');
      return;
    }

    if (await knex.schema.hasTable('payments_enrollment_links')) {
      const rows = await knex('payments_enrollment_links')
        .distinct('enrollment_id')
        .whereNotNull('enrollment_id');

      ids = rows.map((row) => row.enrollment_id).filter(Boolean);
    } else if (await knex.schema.hasColumn('payments', 'enrollment_id')) {
      const rows = await knex('payments')
        .distinct('enrollment_id')
        .whereNotNull('enrollment_id');

      ids = rows.map((row) => row.enrollment_id).filter(Boolean);
    } else {
      console.log(
        '[migration] No payment → enrollment relation storage found — skipping.',
      );
      return;
    }

    if (ids.length === 0) {
      console.log('[migration] No enrollments with payments found — nothing to update.');
      return;
    }

    const updated = await knex('enrollments')
      .whereIn('id', ids)
      .update({ [confirmationColumn]: true });

    console.log(
      `[migration] Set ${confirmationColumn} = true on ${updated} enrollment(s).`,
    );
  },

  async down(knex) {
    let confirmationColumn = null;

    if (await knex.schema.hasColumn('enrollments', 'is_confirmed')) {
      confirmationColumn = 'is_confirmed';
    } else if (await knex.schema.hasColumn('enrollments', 'isConfirmed')) {
      confirmationColumn = 'isConfirmed';
    } else {
      console.log('[migration] No enrollment confirmation column found — nothing to revert.');
      return;
    }

    // Revert: mark all enrollments as unconfirmed
    await knex('enrollments').update({ [confirmationColumn]: false });
    console.log(
      `[migration] Reverted ${confirmationColumn} to false for all enrollments.`,
    );
  },
};
