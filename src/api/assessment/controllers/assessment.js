'use strict';

/**
 * assessment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const populate = ['class', 'subject', 'teacher', 'academicPeriod', 'school', 'schoolYear'];

module.exports = createCoreController('api::assessment.assessment', ({ strapi }) => ({
  async create(ctx) {
    const data = ctx.request.body?.data || ctx.request.body;

    try {
      await strapi.service('api::assessment.assessment').validateAssessment(data);
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    const entity = await strapi.entityService.create('api::assessment.assessment', {
      data,
      populate,
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body?.data || ctx.request.body;

    try {
      await strapi.service('api::assessment.assessment').validateAssessment(data, { assessmentId: id });
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    const entity = await strapi.entityService.update('api::assessment.assessment', id, {
      data,
      populate,
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },
}));
