'use strict';

/**
 * timetable-slot router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/timetable-slots',
      handler: 'api::timetable-slot.timetable-slot.find',
      config: {
        auth: {
          scope: ['api::timetable-slot.timetable-slot.find'],
        },
      },
    },
    {
      method: 'GET',
      path: '/timetable-slots/weekly',
      handler: 'api::timetable-slot.timetable-slot.weekly',
      config: {
        auth: {
          scope: ['api::timetable-slot.timetable-slot.weekly'],
        },
      },
    },
    {
      method: 'GET',
      path: '/timetable-slots/:id',
      handler: 'api::timetable-slot.timetable-slot.findOne',
      config: {
        auth: {
          scope: ['api::timetable-slot.timetable-slot.findOne'],
        },
      },
    },
    {
      method: 'POST',
      path: '/timetable-slots',
      handler: 'api::timetable-slot.timetable-slot.create',
      config: {
        auth: {
          scope: ['api::timetable-slot.timetable-slot.create'],
        },
      },
    },
    {
      method: 'PUT',
      path: '/timetable-slots/:id',
      handler: 'api::timetable-slot.timetable-slot.update',
      config: {
        auth: {
          scope: ['api::timetable-slot.timetable-slot.update'],
        },
      },
    },
    {
      method: 'DELETE',
      path: '/timetable-slots/:id',
      handler: 'api::timetable-slot.timetable-slot.delete',
      config: {
        auth: {
          scope: ['api::timetable-slot.timetable-slot.delete'],
        },
      },
    },
  ],
};
