'use strict';

/**
 * class controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::class.class', ({ strapi }) => ({
    async delete(ctx) {
        const { id } = ctx.params;

        const enrollmentCount = await strapi.db.query('api::enrollment.enrollment').count({
            where: { class: id },
        });

        if (enrollmentCount > 0) {
            return ctx.badRequest(
                'Impossible de supprimer une classe qui contient encore des inscriptions.'
            );
        }

        const response = await super.delete(ctx);

        return response;
    },
}));
