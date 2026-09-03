'use strict';

/**
 * fee-schedule service
 */

const { createCoreService } = require('@strapi/strapi').factories;

function relationId(value) {
    if (value === undefined || value === null) {
        return undefined;
    }

    if (typeof value === 'number' || typeof value === 'string') {
        return value;
    }

    return value.id ?? value.connect?.[0]?.id ?? value.set?.[0]?.id;
}

module.exports = createCoreService('api::fee-schedule.fee-schedule', ({ strapi }) => ({
    async assertNoDuplicate(data) {
        const schoolId = relationId(data.school);
        const schoolYearId = relationId(data.schoolYear);

        if (!schoolId || !schoolYearId || !data.cycle || !data.paymentType) {
            throw new Error('École, année scolaire, cycle et type de paiement sont obligatoires.');
        }

        const existing = await strapi.entityService.findMany('api::fee-schedule.fee-schedule', {
            filters: {
                school: { id: schoolId },
                schoolYear: { id: schoolYearId },
                cycle: data.cycle,
                level: data.level ?? null,
                paymentType: data.paymentType,
            },
            limit: 1,
        });

        if (existing.length > 0) {
            throw new Error(
                'Un tarif existe déjà pour cette combinaison cycle/niveau/type de paiement.',
            );
        }
    },
}));
