'use strict';

/**
 * grade-entry service
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

function duplicateFilters(data) {
  return {
    assessment: { id: relationId(data.assessment) },
    enrollment: { id: relationId(data.enrollment) },
  };
}

module.exports = createCoreService('api::grade-entry.grade-entry', ({ strapi }) => ({
  async validateGradeEntry(data, options = {}) {
    const assessmentId = relationId(data.assessment);
    const enrollmentId = relationId(data.enrollment);

    if (!assessmentId || !enrollmentId) {
      throw new Error("L'évaluation et l'inscription sont obligatoires.");
    }

    const assessment = await strapi.entityService.findOne('api::assessment.assessment', assessmentId, {
      populate: ['class', 'school', 'schoolYear'],
    });

    if (!assessment) {
      throw new Error('Évaluation introuvable.');
    }

    if (!data.isAbsent && data.score !== null && data.score !== undefined) {
      if (Number(data.score) < 0 || Number(data.score) > Number(assessment.maxScore)) {
        throw new Error('La note doit être comprise entre zéro et la note maximale.');
      }
    }

    if (!options.allowExisting) {
      const filters = duplicateFilters(data);
      if (options.gradeEntryId) {
        filters.id = { $ne: options.gradeEntryId };
      }

      const duplicate = await strapi.entityService.findMany('api::grade-entry.grade-entry', {
        filters,
        limit: 1,
      });

      if (duplicate.length > 0) {
        throw new Error('Une note existe déjà pour cette évaluation et cette inscription.');
      }
    }
  },

  async bulkSave(payload) {
    const entries = Array.isArray(payload?.entries) ? payload.entries : [];

    if (entries.length === 0) {
      throw new Error('Aucune note fournie.');
    }

    const saved = [];

    for (const entry of entries) {
      await strapi.service('api::grade-entry.grade-entry').validateGradeEntry(entry, { allowExisting: true });
      const existing = await strapi.entityService.findMany('api::grade-entry.grade-entry', {
        filters: duplicateFilters(entry),
        limit: 1,
      });
      const entity = existing[0]
        ? await strapi.entityService.update('api::grade-entry.grade-entry', existing[0].id, {
            data: entry,
            populate: ['assessment', 'enrollment', 'school', 'schoolYear'],
          })
        : await strapi.entityService.create('api::grade-entry.grade-entry', {
            data: entry,
            populate: ['assessment', 'enrollment', 'school', 'schoolYear'],
          });
      saved.push(entity);
    }

    return saved;
  },
}));
