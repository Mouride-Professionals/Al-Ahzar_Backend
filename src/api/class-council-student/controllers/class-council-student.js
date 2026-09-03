'use strict';

/**
 * class-council-student controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::class-council-student.class-council-student', ({ strapi }) => ({
  async update(ctx) {
    const { id } = ctx.params;
    const current = await strapi.entityService.findOne('api::class-council-student.class-council-student', id, {
      populate: ['council'],
    });

    if (current?.council?.status === 'validated' || current?.council?.status === 'archived') {
      return ctx.badRequest('Un conseil validé ou archivé ne peut pas être modifié.');
    }

    const data = ctx.request.body?.data || ctx.request.body;
    const entity = await strapi.entityService.update('api::class-council-student.class-council-student', id, {
      data,
      populate: ['council', 'enrollment.student', 'school', 'schoolYear'],
    });
    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },
}));
