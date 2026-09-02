'use strict';

/**
 * course-session service
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

async function assertClassScope(strapi, classId, schoolId, schoolYearId) {
  const classEntity = await strapi.entityService.findOne('api::class.class', classId, {
    populate: ['school', 'schoolYear'],
  });

  if (!classEntity) {
    throw new Error('Classe introuvable.');
  }

  if (String(classEntity.school?.id) !== String(schoolId)) {
    throw new Error("La classe ne correspond pas à l'école sélectionnée.");
  }

  if (String(classEntity.schoolYear?.id) !== String(schoolYearId)) {
    throw new Error("La classe ne correspond pas à l'année scolaire sélectionnée.");
  }
}

module.exports = createCoreService('api::course-session.course-session', ({ strapi }) => ({
  async validateCourseSession(data, options = {}) {
    const sessionId = options.sessionId;
    let current = null;

    if (sessionId) {
      current = await strapi.entityService.findOne('api::course-session.course-session', sessionId, {
        populate: ['class', 'school', 'schoolYear'],
      });
    }

    const classId = relationId(data.class) || current?.class?.id;
    const schoolId = relationId(data.school) || current?.school?.id;
    const schoolYearId = relationId(data.schoolYear) || current?.schoolYear?.id;

    if (!classId || !schoolId || !schoolYearId) {
      throw new Error('Classe, école et année scolaire sont obligatoires.');
    }

    await assertClassScope(strapi, classId, schoolId, schoolYearId);

    const sessionDate = data.sessionDate || current?.sessionDate;

    if (sessionDate) {
      const schoolYear = await strapi.entityService.findOne(
        'api::school-year.school-year',
        schoolYearId,
      );

      if (schoolYear) {
        if (schoolYear.startDate && sessionDate < schoolYear.startDate) {
          throw new Error("La date doit être comprise dans l'année scolaire sélectionnée.");
        }

        if (schoolYear.endDate && sessionDate > schoolYear.endDate) {
          throw new Error("La date doit être comprise dans l'année scolaire sélectionnée.");
        }
      }
    }
  },
}));
