'use strict';

/**
 * school router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/schools',
      handler: 'api::school.school.find',
      config: { auth: { scope: ['api::school.school.find'] } },
    },
    {
      method: 'GET',
      path: '/schools/:id',
      handler: 'api::school.school.findOne',
      config: { auth: { scope: ['api::school.school.findOne'] } },
    },
    {
      method: 'POST',
      path: '/schools',
      handler: 'api::school.school.create',
      config: { auth: { scope: ['api::school.school.create'] } },
    },
    {
      method: 'PUT',
      path: '/schools/:id',
      handler: 'api::school.school.update',
      config: { auth: { scope: ['api::school.school.update'] } },
    },
    {
      method: 'DELETE',
      path: '/schools/:id',
      handler: 'api::school.school.delete',
      config: { auth: { scope: ['api::school.school.delete'] } },
    },
    {
      method: 'POST',
      path: '/schools/:id/period-template',
      handler: 'api::school.school.updatePeriodTemplate',
      config: { auth: { scope: ['api::school.school.updatePeriodTemplate'] } },
    },
  ],
};
