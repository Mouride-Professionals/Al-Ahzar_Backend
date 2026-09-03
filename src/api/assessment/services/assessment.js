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

const CYCLE_TERMINAL_LEVELS = ['CM2', 'a 3eme', 'Terminale'];

module.exports = createCoreService('api::assessment.assessment', ({ strapi }) => ({
  async generateBatch(data) {
    const assessmentType = data.assessmentType;
    const classId = relationId(data.class);
    const schoolId = relationId(data.school);
    const schoolYearId = relationId(data.schoolYear);
    const academicPeriodId = relationId(data.academicPeriod);
    const rows = Array.isArray(data.rows) ? data.rows : [];

    if (!['composition', 'exam'].includes(assessmentType)) {
      throw new Error("Le type doit être 'composition' ou 'exam'.");
    }

    if (!classId || !schoolId || !schoolYearId || rows.length === 0) {
      throw new Error('Classe, école, année scolaire et au moins une matière sont obligatoires.');
    }

    if (assessmentType === 'composition' && !academicPeriodId) {
      throw new Error('La période académique est obligatoire pour une composition.');
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

    if (assessmentType === 'exam' && !CYCLE_TERMINAL_LEVELS.includes(classEntity.level)) {
      throw new Error(
        "Un examen ne concerne que les classes de fin de cycle (CM2, 3ème, Terminale).",
      );
    }

    const created = [];

    for (const row of rows) {
      const subjectId = relationId(row.subject);

      if (!subjectId || !row.assessmentDate) {
        throw new Error('Chaque ligne doit avoir une matière et une date.');
      }

      const entity = await strapi.entityService.create('api::assessment.assessment', {
        data: {
          title: row.title,
          assessmentType,
          assessmentDate: row.assessmentDate,
          startTime: row.startTime || null,
          endTime: row.endTime || null,
          maxScore: row.maxScore || 20,
          coefficient: row.coefficient || 1,
          class: classId,
          subject: subjectId,
          teacher: relationId(row.teacher) || null,
          academicPeriod: assessmentType === 'composition' ? academicPeriodId : null,
          school: schoolId,
          schoolYear: schoolYearId,
        },
        populate: ['class', 'subject', 'teacher', 'academicPeriod', 'school', 'schoolYear'],
      });

      created.push(entity);
    }

    return created;
  },

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
