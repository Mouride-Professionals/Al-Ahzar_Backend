'use strict';

/**
 * school controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::school.school', ({ strapi }) => ({
  async updatePeriodTemplate(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body?.data || ctx.request.body || {};
    const periodTemplate = data.periodTemplate;

    if (!Array.isArray(periodTemplate)) {
      return ctx.badRequest('periodTemplate doit être un tableau.');
    }

    for (const period of periodTemplate) {
      if (
        !period.label ||
        !period.startTime ||
        !period.endTime ||
        period.startTime >= period.endTime
      ) {
        return ctx.badRequest(
          'Chaque créneau doit avoir un libellé et une heure de début antérieure à la fin.',
        );
      }
    }

    const entity = await strapi.entityService.update('api::school.school', id, {
      data: { periodTemplate },
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },
}));
