"use strict";

const { generateUniqueIdentifier } = require('../utils/identifier');

module.exports = ({ strapi }) => ({
  /**
   * Create a student with retries on unique-constraint collisions for studentIdentifer
   * options: { maxAttempts }
   */
  async createStudentWithRetry(data, options = {}) {
    const maxAttempts = options.maxAttempts ?? 50; // try more times by default
    const genMaxAttempts = options.genMaxAttempts ?? 200;

    // Ensure we have an identifier to try first
    if (!data.studentIdentifer) {
      data.studentIdentifer = await generateUniqueIdentifier(strapi, genMaxAttempts);
    }

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const created = await strapi.entityService.create('api::student.student', { data });
        return created;
      } catch (err) {
        // Detect unique constraint violation (Postgres '23505' or message containing 'duplicate' or field name)
        const message = String(err && (err.message || err));
        const isUniqueViolation = (err && err.code === '23505') || /duplicate key|unique constraint|studentIdentifer/i.test(message);

        if (!isUniqueViolation) {
          throw err; // rethrow other errors
        }

        // On unique violation, generate a new identifier and retry
        if (attempt < maxAttempts - 1) {
          data.studentIdentifer = await generateUniqueIdentifier(strapi, genMaxAttempts);
          continue;
        }

        // Exhausted attempts
        const e = new Error('Unable to create student: repeated studentIdentifer collisions');
        e.cause = err;
        throw e;
      }
    }
  }
});
