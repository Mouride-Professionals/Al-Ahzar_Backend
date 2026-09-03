'use strict';

/**
 * enrollment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::enrollment.enrollment', ({ strapi }) => ({
    async create(ctx) {
        const { data } = ctx.request.body;

        // Get the class ID from the request data
        const classId = data.class;

        // Find the highest enrollment number for the given class
        const maxEnrollment = await strapi.db.query('api::enrollment.enrollment').findOne({
            where: { class: classId },
            orderBy: { enrollmentNumber: 'desc' },
            select: ['enrollmentNumber'],
        });

        // Set the enrollment number to the highest found + 1, or 1 if none found
        data.enrollmentNumber = maxEnrollment ? maxEnrollment.enrollmentNumber + 1 : 1;

        // Call the default core controller create method
        const response = await super.create(ctx);

        return response;
    },

    async update(ctx) {
        const { data } = ctx.request.body;
        const { id } = ctx.params;

        if (data.class) {
            const existing = await strapi.db.query('api::enrollment.enrollment').findOne({
                where: { id },
                populate: ['class'],
            });

            const isMovingToAnotherClass =
                !existing?.class || String(existing.class.id) !== String(data.class);

            if (isMovingToAnotherClass) {
                // Find the highest enrollment number in the destination class
                const maxEnrollment = await strapi.db.query('api::enrollment.enrollment').findOne({
                    where: { class: data.class },
                    orderBy: { enrollmentNumber: 'desc' },
                    select: ['enrollmentNumber'],
                });

                data.enrollmentNumber = maxEnrollment ? maxEnrollment.enrollmentNumber + 1 : 1;
            }
        }

        const response = await super.update(ctx);

        return response;
    },

    async bulkCreate(ctx) {
        const payload = ctx.request.body?.data || ctx.request.body;

        try {
            const result = await strapi.service('api::enrollment.enrollment').bulkCreate(payload);

            return ctx.send(result);
        } catch (error) {
            return ctx.badRequest(error.message);
        }
    },
}));
