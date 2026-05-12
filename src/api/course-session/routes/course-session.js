'use strict';

/**
 * course-session router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/course-sessions',
      handler: 'api::course-session.course-session.find',
      config: { auth: { scope: ['api::course-session.course-session.find'] } },
    },
    {
      method: 'GET',
      path: '/course-sessions/:id',
      handler: 'api::course-session.course-session.findOne',
      config: { auth: { scope: ['api::course-session.course-session.findOne'] } },
    },
    {
      method: 'POST',
      path: '/course-sessions',
      handler: 'api::course-session.course-session.create',
      config: { auth: { scope: ['api::course-session.course-session.create'] } },
    },
    {
      method: 'PUT',
      path: '/course-sessions/:id',
      handler: 'api::course-session.course-session.update',
      config: { auth: { scope: ['api::course-session.course-session.update'] } },
    },
    {
      method: 'DELETE',
      path: '/course-sessions/:id',
      handler: 'api::course-session.course-session.delete',
      config: { auth: { scope: ['api::course-session.course-session.delete'] } },
    },
    {
      method: 'POST',
      path: '/course-sessions/:id/mark-done',
      handler: 'api::course-session.course-session.markDone',
      config: { auth: { scope: ['api::course-session.course-session.markDone'] } },
    },
    {
      method: 'POST',
      path: '/course-sessions/:id/cancel',
      handler: 'api::course-session.course-session.cancel',
      config: { auth: { scope: ['api::course-session.course-session.cancel'] } },
    },
    {
      method: 'POST',
      path: '/course-sessions/:id/replace',
      handler: 'api::course-session.course-session.replace',
      config: { auth: { scope: ['api::course-session.course-session.replace'] } },
    },
  ],
};
