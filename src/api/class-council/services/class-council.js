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

    const schoolYearEntity = await strapi.entityService.findOne('api::school-year.school-year', data.schoolYear);

    if (schoolYearEntity) {
      if (schoolYearEntity.startDate && data.councilDate < schoolYearEntity.startDate) {
        throw new Error("La date doit être comprise dans l'année scolaire sélectionnée.");
      }

      if (schoolYearEntity.endDate && data.councilDate > schoolYearEntity.endDate) {
        throw new Error("La date doit être comprise dans l'année scolaire sélectionnée.");
      }
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

    const classSubjects = await strapi.entityService.findMany('api::class-subject.class-subject', {
      filters: { class: { id: data.class } },
      populate: ['subject'],
      limit: 100,
    });
    const subjectSummaries = await Promise.all(
      classSubjects
        .filter((classSubject) => classSubject.subject?.id)
        .map(async (classSubject) => {
          const summary = await strapi.service('api::grade-entry.grade-entry').summary({
            classId: data.class,
            schoolYearId: data.schoolYear,
            subjectId: classSubject.subject.id,
            academicPeriodId: data.academicPeriod,
          });

          return {
            coefficient: Number(classSubject.coefficient || 1),
            students: summary.students,
          };
        }),
    );

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

      // Subject averages (from grade-entry.summary, weighted by Assessment.coefficient
      // within each subject) combined here, weighted by each subject's class-subject.coefficient.
      const subjectContributions = subjectSummaries
        .map(({ coefficient, students }) => {
          const entry = students.find((student) => student.enrollment.id === enrollment.id);
          return entry && entry.average !== null
            ? { average: Number(entry.average), coefficient }
            : null;
        })
        .filter(Boolean);
      const weightedTotal = subjectContributions.reduce(
        (total, contribution) => total + contribution.average * contribution.coefficient,
        0,
      );
      const coefficientTotal = subjectContributions.reduce(
        (total, contribution) => total + contribution.coefficient,
        0,
      );

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
