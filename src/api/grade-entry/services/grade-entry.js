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

  async summary(params = {}) {
    const classId = params.classId || params.class;
    const schoolYearId = params.schoolYearId || params.schoolYear;

    if (!classId || !schoolYearId) {
      throw new Error("La classe et l'année scolaire sont obligatoires.");
    }

    const assessmentFilters = {
      class: { id: classId },
      schoolYear: { id: schoolYearId },
    };

    if (params.subjectId || params.subject) {
      assessmentFilters.subject = { id: params.subjectId || params.subject };
    }

    if (params.academicPeriodId || params.academicPeriod) {
      assessmentFilters.academicPeriod = { id: params.academicPeriodId || params.academicPeriod };
    }

    if (params.assessmentType) {
      assessmentFilters.assessmentType = params.assessmentType;
    }

    const assessments = await strapi.entityService.findMany('api::assessment.assessment', {
      filters: assessmentFilters,
      populate: ['subject', 'academicPeriod'],
      limit: 500,
    });
    const assessmentIds = assessments.map((assessment) => assessment.id);

    const enrollments = await strapi.entityService.findMany('api::enrollment.enrollment', {
      filters: {
        class: { id: classId },
        schoolYear: { id: schoolYearId },
      },
      populate: ['student'],
      limit: 500,
    });

    const entries = assessmentIds.length
      ? await strapi.entityService.findMany('api::grade-entry.grade-entry', {
          filters: {
            assessment: { id: { $in: assessmentIds } },
            enrollment: { id: { $in: enrollments.map((enrollment) => enrollment.id) } },
          },
          populate: ['assessment', 'enrollment'],
          limit: 1000,
        })
      : [];

    const students = enrollments.map((enrollment) => {
      const studentEntries = entries.filter((entry) => entry.enrollment?.id === enrollment.id);
      const scoredEntries = studentEntries.filter(
        (entry) => !entry.isAbsent && entry.score !== null && entry.score !== undefined,
      );
      const weightedTotal = scoredEntries.reduce((total, entry) => {
        const maxScore = Number(entry.assessment?.maxScore || 20);
        const coefficient = Number(entry.assessment?.coefficient || 1);
        const normalizedScore = maxScore > 0 ? (Number(entry.score) / maxScore) * 20 : Number(entry.score);

        return total + normalizedScore * coefficient;
      }, 0);
      const coefficientTotal = scoredEntries.reduce(
        (total, entry) => total + Number(entry.assessment?.coefficient || 1),
        0,
      );
      const average = coefficientTotal > 0 ? weightedTotal / coefficientTotal : null;

      return {
        enrollment,
        average,
        absentCount: studentEntries.filter((entry) => entry.isAbsent).length,
        gradedCount: scoredEntries.length,
      };
    });

    const rankedStudents = [...students]
      .filter((student) => student.average !== null)
      .sort((left, right) => Number(right.average) - Number(left.average))
      .map((student, index) => ({ ...student, rank: index + 1 }));
    const rankByEnrollment = new Map(rankedStudents.map((student) => [student.enrollment.id, student.rank]));
    const classAverageValues = students
      .map((student) => student.average)
      .filter((average) => average !== null);

    return {
      assessmentCount: assessments.length,
      classAverage:
        classAverageValues.length > 0
          ? classAverageValues.reduce((total, average) => total + Number(average), 0) / classAverageValues.length
          : null,
      students: students.map((student) => ({
        ...student,
        rank: rankByEnrollment.get(student.enrollment.id) || null,
      })),
    };
  },
}));
