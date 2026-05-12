'use strict';

/**
 * timetable-slot controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const populate = ['class', 'teacher', 'subject', 'school', 'schoolYear'];

module.exports = createCoreController('api::timetable-slot.timetable-slot', ({ strapi }) => ({
  async create(ctx) {
    const data = ctx.request.body?.data || ctx.request.body;

    try {
      await strapi
        .service('api::timetable-slot.timetable-slot')
        .validateTimetableSlot(data);
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    const entity = await strapi.entityService.create('api::timetable-slot.timetable-slot', {
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
        .service('api::timetable-slot.timetable-slot')
        .validateTimetableSlot(data, { slotId: id });
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    const entity = await strapi.entityService.update('api::timetable-slot.timetable-slot', id, {
      data,
      populate,
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },

  async weekly(ctx) {
    const filters = strapi
      .service('api::timetable-slot.timetable-slot')
      .buildWeeklyFilters(ctx.query);

    const entities = await strapi.entityService.findMany('api::timetable-slot.timetable-slot', {
      filters,
      populate,
      sort: ['dayOfWeek:asc', 'startTime:asc'],
    });

    const sanitized = await this.sanitizeOutput(entities, ctx);
    return this.transformResponse(sanitized);
  },
}));
