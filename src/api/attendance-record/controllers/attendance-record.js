'use strict';

/**
 * attendance-record controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const populate = ['enrollment', 'courseSession', 'class', 'school', 'schoolYear', 'recordedBy'];

module.exports = createCoreController('api::attendance-record.attendance-record', ({ strapi }) => ({
  async create(ctx) {
    const data = ctx.request.body?.data || ctx.request.body;

    try {
      await strapi.service('api::attendance-record.attendance-record').validateAttendanceRecord(data);
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    const entity = await strapi.entityService.create('api::attendance-record.attendance-record', {
      data: {
        ...data,
        recordedAt: data.recordedAt || new Date().toISOString(),
        recordedBy: data.recordedBy || ctx.state.user?.id,
      },
      populate,
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },

  async bulk(ctx) {
    const payload = ctx.request.body?.data || ctx.request.body;

    try {
      const records = await strapi
        .service('api::attendance-record.attendance-record')
        .bulkSave(payload, ctx.state.user?.id);
      const sanitized = await this.sanitizeOutput(records, ctx);
      return this.transformResponse(sanitized);
    } catch (error) {
      return ctx.badRequest(error.message);
    }
  },
}));
