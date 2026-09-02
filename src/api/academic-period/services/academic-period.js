'use strict';

/**
 * academic-period service
 */

const { createCoreService } = require('@strapi/strapi').factories;

function relationId(value) {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (typeof value === 'number' || typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return relationId(value[0]);
  }

  if (value.id) {
    return value.id;
  }

  if (Array.isArray(value.connect)) {
    return relationId(value.connect[0]);
  }

  if (value.connect?.id) {
    return value.connect.id;
  }

  if (Array.isArray(value.set)) {
    return relationId(value.set[0]);
  }

  if (value.set?.id) {
    return value.set.id;
  }

  return undefined;
}

module.exports = createCoreService('api::academic-period.academic-period', ({ strapi }) => ({
  async validatePeriod(data, options = {}) {
    const schoolId = relationId(data.school);
    const schoolYearId = relationId(data.schoolYear);
    const periodId = options.periodId;

    if (!schoolId || !schoolYearId || !data.name || !data.type || !data.order) {
      throw new Error('Nom, type, ordre, école et année scolaire sont obligatoires.');
    }

    if (data.startDate && data.endDate && data.startDate > data.endDate) {
      throw new Error('La date de début doit être antérieure à la date de fin.');
    }

    if (data.startDate || data.endDate) {
      const schoolYear = await strapi.entityService.findOne(
        'api::school-year.school-year',
        schoolYearId,
      );

      if (schoolYear) {
        if (data.startDate && schoolYear.startDate && data.startDate < schoolYear.startDate) {
          throw new Error("La date de début doit être comprise dans l'année scolaire sélectionnée.");
        }

        if (data.endDate && schoolYear.endDate && data.endDate > schoolYear.endDate) {
          throw new Error("La date de fin doit être comprise dans l'année scolaire sélectionnée.");
        }
      }
    }

    const duplicateFilters = {
      school: { id: schoolId },
      schoolYear: { id: schoolYearId },
      order: data.order,
    };

    if (periodId) {
      duplicateFilters.id = { $ne: periodId };
    }

    const duplicate = await strapi.entityService.findMany('api::academic-period.academic-period', {
      filters: duplicateFilters,
      limit: 1,
    });

    if (duplicate.length > 0) {
      throw new Error('Une période existe déjà avec cet ordre pour cette école et cette année scolaire.');
    }
  },
}));
