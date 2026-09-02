'use strict';

/**
 * assessment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

function relationId(value) {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'number' || typeof value === 'string') return value;
  if (Array.isArray(value)) return relationId(value[0]);
  if (value.id) return value.id;
  if (Array.isArray(value.connect)) return relationId(value.connect[0]);
  if (value.connect?.id) return value.connect.id;
  if (Array.isArray(value.set)) return relationId(value.set[0]);
  if (value.set?.id) return value.set.id;
  return undefined;
}

module.exports = createCoreService('api::assessment.assessment', ({ strapi }) => ({
  async validateAssessment(data, options = {}) {
    let current = null;

    if (options.assessmentId) {
      current = await strapi.entityService.findOne('api::assessment.assessment', options.assessmentId, {
        populate: ['class', 'school', 'schoolYear'],
      });
    }

    const classId = relationId(data.class) || current?.class?.id;
    const schoolId = relationId(data.school) || current?.school?.id;
    const schoolYearId = relationId(data.schoolYear) || current?.schoolYear?.id;

    if (!classId || !schoolId || !schoolYearId || !(data.title || current?.title)) {
      throw new Error('Titre, classe, école et année scolaire sont obligatoires.');
    }

    if (data.maxScore !== undefined && Number(data.maxScore) <= 0) {
      throw new Error('La note maximale doit être supérieure à zéro.');
    }

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

    const assessmentDate = data.assessmentDate || current?.assessmentDate;
    const dueDate = data.dueDate !== undefined ? data.dueDate : current?.dueDate;

    if (assessmentDate || dueDate) {
      const schoolYear = await strapi.entityService.findOne(
        'api::school-year.school-year',
        schoolYearId,
      );

      if (schoolYear) {
        if (assessmentDate && schoolYear.startDate && assessmentDate < schoolYear.startDate) {
          throw new Error("La date doit être comprise dans l'année scolaire sélectionnée.");
        }

        if (assessmentDate && schoolYear.endDate && assessmentDate > schoolYear.endDate) {
          throw new Error("La date doit être comprise dans l'année scolaire sélectionnée.");
        }

        if (dueDate && schoolYear.startDate && dueDate < schoolYear.startDate) {
          throw new Error("La date doit être comprise dans l'année scolaire sélectionnée.");
        }

        if (dueDate && schoolYear.endDate && dueDate > schoolYear.endDate) {
          throw new Error("La date doit être comprise dans l'année scolaire sélectionnée.");
        }
      }
    }
  },
}));
