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
    // Collect distinct enrollment IDs that have at least one payment
    const rows = await knex('payments')
      .distinct('enrollment_id')
      .whereNotNull('enrollment_id');

    const ids = rows.map((r) => r.enrollment_id).filter(Boolean);

    if (ids.length === 0) {
      console.log('[migration] No enrollments with payments found — nothing to update.');
      return;
    }

    const updated = await knex('enrollments')
      .whereIn('id', ids)
      .update({ is_confirmed: true });

    console.log(`[migration] Set is_confirmed = true on ${updated} enrollment(s).`);
  },

  async down(knex) {
    // Revert: mark all enrollments as unconfirmed
    await knex('enrollments').update({ is_confirmed: false });
    console.log('[migration] Reverted is_confirmed to false for all enrollments.');
  },
};
