'use strict';

/**
 * class-council controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const populate = ['class', 'academicPeriod', 'school', 'schoolYear', 'students'];

module.exports = createCoreController('api::class-council.class-council', ({ strapi }) => ({
  async generate(ctx) {
    const data = ctx.request.body?.data || ctx.request.body;

    try {
      const council = await strapi.service('api::class-council.class-council').generate(data);
      const sanitized = await this.sanitizeOutput(council, ctx);
      return this.transformResponse(sanitized);
    } catch (error) {
      return ctx.badRequest(error.message);
    }
  },

  async validateCouncil(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.entityService.update('api::class-council.class-council', id, {
      data: { status: 'validated' },
      populate,
    });
    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },

  async recalculate(ctx) {
    const { id } = ctx.params;

    try {
      const entity = await strapi.service('api::class-council.class-council').recalculate(id);
      const sanitized = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitized);
    } catch (error) {
      return ctx.badRequest(error.message);
    }
  },

  async reopen(ctx) {
    const { id } = ctx.params;

    try {
      const entity = await strapi.service('api::class-council.class-council').reopen(id);
      const sanitized = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitized);
    } catch (error) {
      return ctx.badRequest(error.message);
    }
  },
}));
