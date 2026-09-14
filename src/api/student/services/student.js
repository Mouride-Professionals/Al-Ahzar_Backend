'use strict';

/**
 * student service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::student.student', ({ strapi }) => ({
  /**
   * A student needs a name in at least one script: French (firstname +
   * lastname) or Arabic (arabicFullName). Neither is unconditionally
   * required on its own so families who only have a name in one script
   * aren't blocked.
   */
  async validateName(data, { studentId } = {}) {
    let merged = data;

    if (typeof studentId === 'number' || typeof studentId === 'string') {
      const existing = await strapi.entityService.findOne('api::student.student', studentId, {
        fields: ['firstname', 'lastname', 'arabicFullName'],
      });
      merged = { ...existing, ...data };
    }

    const hasFrenchName = Boolean(merged.firstname?.trim()) && Boolean(merged.lastname?.trim());
    const hasArabicName = Boolean(merged.arabicFullName?.trim());

    if (!hasFrenchName && !hasArabicName) {
      throw new Error(
        'Renseignez le nom et le prénom, ou au moins le nom complet en arabe.'
      );
    }
  },
}));
