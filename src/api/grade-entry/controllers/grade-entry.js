'use strict';

/**
 * grade-entry controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const populate = ['assessment', 'enrollment', 'school', 'schoolYear'];

module.exports = createCoreController('api::grade-entry.grade-entry', ({ strapi }) => ({
  async create(ctx) {
    const data = ctx.request.body?.data || ctx.request.body;

    try {
      await strapi.service('api::grade-entry.grade-entry').validateGradeEntry(data);
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    const entity = await strapi.entityService.create('api::grade-entry.grade-entry', {
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
      await strapi.service('api::grade-entry.grade-entry').validateGradeEntry(data, { gradeEntryId: id });
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    const entity = await strapi.entityService.update('api::grade-entry.grade-entry', id, {
      data,
      populate,
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },

  async bulk(ctx) {
    const payload = ctx.request.body?.data || ctx.request.body;

    try {
      const entries = await strapi.service('api::grade-entry.grade-entry').bulkSave(payload);
      const sanitized = await this.sanitizeOutput(entries, ctx);
      return this.transformResponse(sanitized);
    } catch (error) {
      return ctx.badRequest(error.message);
    }
  },
}));
