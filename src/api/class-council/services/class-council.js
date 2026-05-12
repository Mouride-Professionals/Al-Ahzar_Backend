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

    for (const enrollment of enrollments) {
      const attendance = await strapi.entityService.findMany('api::attendance-record.attendance-record', {
        filters: {
          enrollment: { id: enrollment.id },
          schoolYear: { id: data.schoolYear },
        },
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

      await strapi.entityService.create('api::class-council-student.class-council-student', {
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
    }

    return strapi.entityService.findOne('api::class-council.class-council', council.id, {
      populate: ['class', 'academicPeriod', 'school', 'schoolYear', 'students.enrollment.student'],
    });
  },
}));
