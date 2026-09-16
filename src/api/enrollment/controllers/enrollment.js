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

        const existing = (data.class || data.enrollmentNumber != null)
            ? await strapi.db.query('api::enrollment.enrollment').findOne({
                where: { id },
                populate: ['class'],
            })
            : null;

        if (data.class) {
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

        // A manually-supplied enrollmentNumber (no class move, or a move that
        // didn't already recompute it above) must stay unique within its class.
        if (data.enrollmentNumber != null) {
            const targetClassId = data.class || existing?.class?.id;

            if (targetClassId) {
                const duplicate = await strapi.db.query('api::enrollment.enrollment').findOne({
                    where: {
                        class: targetClassId,
                        enrollmentNumber: data.enrollmentNumber,
                        id: { $ne: id },
                    },
                    populate: ['student'],
                });

                if (duplicate) {
                    const frenchName = [duplicate.student?.firstname, duplicate.student?.lastname]
                        .filter(Boolean)
                        .join(' ');

                    return ctx.badRequest(
                        "Ce numéro d'inscription est déjà utilisé dans cette classe.",
                        {
                            conflictingEnrollmentId: duplicate.id,
                            conflictingStudentName: frenchName || duplicate.student?.arabicFullName || '',
                        },
                    );
                }
            }
        }

        const response = await super.update(ctx);

        return response;
    },

    async swapNumber(ctx) {
        const { id } = ctx.params;
        const body = ctx.request.body?.data || ctx.request.body || {};
        const { withEnrollmentId } = body;

        if (!withEnrollmentId) {
            return ctx.badRequest('withEnrollmentId est requis.');
        }

        const [current, other] = await Promise.all([
            strapi.db.query('api::enrollment.enrollment').findOne({ where: { id }, populate: ['class'] }),
            strapi.db.query('api::enrollment.enrollment').findOne({
                where: { id: withEnrollmentId },
                populate: ['class'],
            }),
        ]);

        if (!current || !other) {
            return ctx.notFound('Inscription introuvable.');
        }

        if (!current.class || !other.class || String(current.class.id) !== String(other.class.id)) {
            return ctx.badRequest("Impossible d'échanger des numéros entre deux classes différentes.");
        }

        await strapi.entityService.update('api::enrollment.enrollment', current.id, {
            data: { enrollmentNumber: other.enrollmentNumber },
        });
        await strapi.entityService.update('api::enrollment.enrollment', other.id, {
            data: { enrollmentNumber: current.enrollmentNumber },
        });

        const updated = await strapi.entityService.findOne('api::enrollment.enrollment', current.id, {
            populate: ['student', 'class', 'schoolYear'],
        });

        return ctx.send({ data: updated });
    },

    async reorder(ctx) {
        const body = ctx.request.body?.data || ctx.request.body || {};
        const { classId, orderedEnrollmentIds } = body;

        if (!classId || !Array.isArray(orderedEnrollmentIds) || orderedEnrollmentIds.length === 0) {
            return ctx.badRequest('classId et orderedEnrollmentIds sont requis.');
        }

        const enrollments = await strapi.db.query('api::enrollment.enrollment').findMany({
            where: { class: classId },
            select: ['id', 'status', 'enrollmentNumber'],
        });

        const active = enrollments.filter((enrollment) => enrollment.status !== 'withdrawn');
        const activeIds = new Set(active.map((enrollment) => String(enrollment.id)));
        const requestedIds = orderedEnrollmentIds.map(String);

        // The list must be exactly the class's active roster: a partial list
        // would leave untouched enrollments colliding with reassigned numbers.
        const isExactRoster =
            requestedIds.length === activeIds.size &&
            new Set(requestedIds).size === requestedIds.length &&
            requestedIds.every((id) => activeIds.has(id));

        if (!isExactRoster) {
            return ctx.badRequest("La liste doit contenir exactement les inscriptions actives de cette classe.");
        }

        const withdrawn = enrollments
            .filter((enrollment) => enrollment.status === 'withdrawn')
            .sort((left, right) => (left.enrollmentNumber ?? 0) - (right.enrollmentNumber ?? 0));

        const finalOrder = [...requestedIds, ...withdrawn.map((enrollment) => String(enrollment.id))];

        for (const [index, id] of finalOrder.entries()) {
            await strapi.entityService.update('api::enrollment.enrollment', id, {
                data: { enrollmentNumber: index + 1 },
            });
        }

        return ctx.send({ data: { updated: finalOrder.length } });
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
