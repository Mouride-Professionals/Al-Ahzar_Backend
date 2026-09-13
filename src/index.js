'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Strapi runs database/migrations before creating new columns, so the
    // status backfill migrations skipped and were marked done. Re-apply here,
    // after schema sync; idempotent.
    const knex = strapi.db.connection;
    const enrollments = await knex('enrollments').whereNull('status').update({ status: 'active' });
    const expenses = await knex('expenses').whereNull('status').update({ status: 'paid' });

    if (enrollments || expenses) {
      strapi.log.info(
        `[bootstrap] Backfilled status on ${enrollments} enrollment(s) and ${expenses} expense(s).`,
      );
    }
  },
};
