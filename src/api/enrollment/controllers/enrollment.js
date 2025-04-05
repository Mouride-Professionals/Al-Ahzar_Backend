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
}));
