'use strict';

/**
 * academic-period controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::academic-period.academic-period', ({ strapi }) => ({
  async create(ctx) {
    const data = ctx.request.body?.data || ctx.request.body;

    try {
      await strapi.service('api::academic-period.academic-period').validatePeriod(data);
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    const entity = await strapi.entityService.create('api::academic-period.academic-period', {
      data,
      populate: ['school', 'schoolYear'],
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body?.data || ctx.request.body;

    try {
      await strapi.service('api::academic-period.academic-period').validatePeriod(data, { periodId: id });
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    const entity = await strapi.entityService.update('api::academic-period.academic-period', id, {
      data,
      populate: ['school', 'schoolYear'],
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },
}));
