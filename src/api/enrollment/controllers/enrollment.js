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

    async delete(ctx) {
        const { id } = ctx.params;

        const payments = await strapi.db.query('api::payment.payment').findMany({
            where: { enrollment: id },
        });

        const hasActivePayment = payments.some((p) => p.status !== 'cancelled');

        if (hasActivePayment) {
            return ctx.badRequest(
                "Impossible de supprimer cette inscription : un paiement non annulé y est rattaché."
            );
        }

        for (const payment of payments) {
            await strapi.entityService.delete('api::payment.payment', payment.id);
        }

        const response = await super.delete(ctx);

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

    async markWithdrawn(ctx) {
        const { id } = ctx.params;
        const body = ctx.request.body?.data || ctx.request.body || {};

        const existing = await strapi.db.query('api::enrollment.enrollment').findOne({
            where: { id },
        });

        if (!existing) {
            return ctx.notFound("Inscription introuvable.");
        }

        if (existing.status === 'withdrawn') {
            return ctx.badRequest("Cette inscription est déjà marquée comme abandon.");
        }

        const withdrawalDate = body.withdrawalDate || new Date().toISOString().slice(0, 10);

        const updated = await strapi.entityService.update('api::enrollment.enrollment', id, {
            data: {
                status: 'withdrawn',
                withdrawalDate,
            },
        });

        return ctx.send({ data: updated });
    },
}));
