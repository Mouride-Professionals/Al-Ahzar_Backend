'use strict';

/**
 * class-council service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::class-council.class-council', ({ strapi }) => ({
  async generate(data) {
    if (!data.class || !data.academicPeriod || !data.school || !data.schoolYear || !data.title || !data.councilDate) {
      throw new Error('Classe, période, école, année scolaire, titre et date sont obligatoires.');
    }

    const period = await strapi.entityService.findOne('api::academic-period.academic-period', data.academicPeriod);

    if (!period) {
      throw new Error('Période académique introuvable.');
    }

    const council = await strapi.entityService.create('api::class-council.class-council', {
      data: {
        title: data.title,
        councilDate: data.councilDate,
        generalNotes: data.generalNotes || null,
        status: 'draft',
        class: data.class,
        academicPeriod: data.academicPeriod,
        school: data.school,
        schoolYear: data.schoolYear,
      },
      populate: ['class', 'academicPeriod', 'school', 'schoolYear'],
    });
    const enrollments = await strapi.entityService.findMany('api::enrollment.enrollment', {
      filters: {
        class: { id: data.class },
        schoolYear: { id: data.schoolYear },
      },
      populate: ['student'],
      limit: 500,
    });
    const generatedStudents = [];

    for (const enrollment of enrollments) {
      const attendanceFilters = {
        enrollment: { id: enrollment.id },
        schoolYear: { id: data.schoolYear },
      };

      if (period.startDate || period.endDate) {
        attendanceFilters.attendanceDate = {};
        if (period.startDate) attendanceFilters.attendanceDate.$gte = period.startDate;
        if (period.endDate) attendanceFilters.attendanceDate.$lte = period.endDate;
      }

      const attendance = await strapi.entityService.findMany('api::attendance-record.attendance-record', {
        filters: attendanceFilters,
        limit: 500,
      });
      const grades = await strapi.entityService.findMany('api::grade-entry.grade-entry', {
        filters: {
          enrollment: { id: enrollment.id },
          assessment: { academicPeriod: { id: data.academicPeriod } },
        },
        populate: ['assessment'],
        limit: 500,
      });
      const scoredGrades = grades.filter((grade) => !grade.isAbsent && grade.score !== null && grade.score !== undefined);
      const weightedTotal = scoredGrades.reduce((total, grade) => {
        const coefficient = Number(grade.assessment?.coefficient || 1);
        return total + Number(grade.score) * coefficient;
      }, 0);
      const coefficientTotal = scoredGrades.reduce((total, grade) => total + Number(grade.assessment?.coefficient || 1), 0);

      const studentSummary = await strapi.entityService.create('api::class-council-student.class-council-student', {
        data: {
          council: council.id,
          enrollment: enrollment.id,
          school: data.school,
          schoolYear: data.schoolYear,
          generalAverage: coefficientTotal > 0 ? weightedTotal / coefficientTotal : null,
          attendanceAbsences: attendance.filter((record) => record.status === 'absent').length,
          attendanceLates: attendance.filter((record) => record.status === 'late').length,
          councilDecision: 'pending',
        },
      });

      generatedStudents.push(studentSummary);
    }

    const rankedStudents = [...generatedStudents]
      .filter((student) => student.generalAverage !== null && student.generalAverage !== undefined)
      .sort((left, right) => Number(right.generalAverage) - Number(left.generalAverage));

    for (let index = 0; index < rankedStudents.length; index += 1) {
      await strapi.entityService.update('api::class-council-student.class-council-student', rankedStudents[index].id, {
        data: { rank: index + 1 },
      });
    }

    return strapi.entityService.findOne('api::class-council.class-council', council.id, {
      populate: ['class', 'academicPeriod', 'school', 'schoolYear', 'students.enrollment.student'],
    });
  },

  async reopen(id) {
    const council = await strapi.entityService.findOne('api::class-council.class-council', id);

    if (!council) {
      throw new Error('Conseil introuvable.');
    }

    if (council.status === 'archived') {
      throw new Error('Un conseil archivé ne peut pas être rouvert.');
    }

    return strapi.entityService.update('api::class-council.class-council', id, {
      data: { status: 'draft' },
      populate: ['class', 'academicPeriod', 'school', 'schoolYear', 'students.enrollment.student'],
    });
  },
}));
