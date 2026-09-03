'use strict';

/**
 * fee-schedule controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::fee-schedule.fee-schedule', ({ strapi }) => ({
    async create(ctx) {
        const { data } = ctx.request.body;

        try {
            await strapi.service('api::fee-schedule.fee-schedule').assertNoDuplicate(data);
        } catch (error) {
            return ctx.badRequest(error.message);
        }

        return super.create(ctx);
    },
}));
