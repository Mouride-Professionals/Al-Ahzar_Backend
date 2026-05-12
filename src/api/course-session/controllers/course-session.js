'use strict';

/**
 * course-session controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const populate = ['timetableSlot', 'class', 'teacher', 'subject', 'school', 'schoolYear'];

module.exports = createCoreController('api::course-session.course-session', ({ strapi }) => ({
  async create(ctx) {
    const data = ctx.request.body?.data || ctx.request.body;

    try {
      await strapi.service('api::course-session.course-session').validateCourseSession(data);
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    const entity = await strapi.entityService.create('api::course-session.course-session', {
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
      await strapi
        .service('api::course-session.course-session')
        .validateCourseSession(data, { sessionId: id });
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    const entity = await strapi.entityService.update('api::course-session.course-session', id, {
      data,
      populate,
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },

  async markDone(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body?.data || ctx.request.body || {};

    const entity = await strapi.entityService.update('api::course-session.course-session', id, {
      data: {
        homeworkGiven: data.homeworkGiven,
        summary: data.summary,
        title: data.title,
        status: 'done',
        completedAt: new Date().toISOString(),
      },
      populate,
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },

  async cancel(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body?.data || ctx.request.body || {};

    if (!data.cancelReason) {
      return ctx.badRequest("Le motif d'annulation est obligatoire.");
    }

    const entity = await strapi.entityService.update('api::course-session.course-session', id, {
      data: {
        cancelReason: data.cancelReason,
        status: 'cancelled',
      },
      populate,
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },

  async replace(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body?.data || ctx.request.body || {};

    if (!data.replacementNote) {
      return ctx.badRequest('La note de remplacement est obligatoire.');
    }

    const entity = await strapi.entityService.update('api::course-session.course-session', id, {
      data: {
        replacementNote: data.replacementNote,
        status: 'replaced',
      },
      populate,
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },
}));
