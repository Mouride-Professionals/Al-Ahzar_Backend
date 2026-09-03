'use strict';

/**
 * enrollment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::enrollment.enrollment', ({ strapi }) => ({
    async bulkCreate(payload) {
        const studentIds = Array.isArray(payload?.studentIds) ? payload.studentIds : [];
        const targetClassId = payload?.targetClassId;
        const schoolYearId = payload?.schoolYearId;
        const enrollmentType = payload?.enrollmentType || 'Ancien Passant';
        const socialStatus = payload?.socialStatus || 'Non';

        if (studentIds.length === 0 || !targetClassId || !schoolYearId) {
            throw new Error('Élèves, classe cible et année scolaire sont obligatoires.');
        }

        const existingEnrollments = await strapi.entityService.findMany('api::enrollment.enrollment', {
            filters: {
                student: { id: { $in: studentIds } },
                schoolYear: { id: schoolYearId },
            },
            populate: ['student'],
        });
        const alreadyEnrolledIds = new Set(
            existingEnrollments.map((enrollment) => String(enrollment.student?.id)),
        );

        // Read the current max once and increment in-process: bulk creates many
        // rows in a single request, so re-querying max per row (like the single
        // create/update actions above) would race against itself.
        const maxEnrollment = await strapi.db.query('api::enrollment.enrollment').findOne({
            where: { class: targetClassId },
            orderBy: { enrollmentNumber: 'desc' },
            select: ['enrollmentNumber'],
        });
        let nextEnrollmentNumber = maxEnrollment ? maxEnrollment.enrollmentNumber + 1 : 1;

        const created = [];
        const skipped = [];

        for (const studentId of studentIds) {
            if (alreadyEnrolledIds.has(String(studentId))) {
                skipped.push({ studentId, reason: 'already_enrolled' });
                continue;
            }

            const entity = await strapi.entityService.create('api::enrollment.enrollment', {
                data: {
                    class: targetClassId,
                    enrollmentDate: new Date().toISOString().slice(0, 10),
                    enrollmentNumber: nextEnrollmentNumber,
                    enrollmentType,
                    isConfirmed: false,
                    schoolYear: schoolYearId,
                    socialStatus,
                    student: studentId,
                },
            });

            nextEnrollmentNumber += 1;
            created.push(entity.id);
        }

        return { created, skipped };
    },
}));
