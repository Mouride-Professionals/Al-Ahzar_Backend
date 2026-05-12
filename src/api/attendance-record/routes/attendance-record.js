'use strict';

/**
 * attendance-record router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/attendance-records',
      handler: 'api::attendance-record.attendance-record.find',
      config: { auth: { scope: ['api::attendance-record.attendance-record.find'] } },
    },
    {
      method: 'GET',
      path: '/attendance-records/:id',
      handler: 'api::attendance-record.attendance-record.findOne',
      config: { auth: { scope: ['api::attendance-record.attendance-record.findOne'] } },
    },
    {
      method: 'POST',
      path: '/attendance-records',
      handler: 'api::attendance-record.attendance-record.create',
      config: { auth: { scope: ['api::attendance-record.attendance-record.create'] } },
    },
    {
      method: 'POST',
      path: '/attendance-records/bulk',
      handler: 'api::attendance-record.attendance-record.bulk',
      config: { auth: { scope: ['api::attendance-record.attendance-record.bulk'] } },
    },
    {
      method: 'PUT',
      path: '/attendance-records/:id',
      handler: 'api::attendance-record.attendance-record.update',
      config: { auth: { scope: ['api::attendance-record.attendance-record.update'] } },
    },
    {
      method: 'DELETE',
      path: '/attendance-records/:id',
      handler: 'api::attendance-record.attendance-record.delete',
      config: { auth: { scope: ['api::attendance-record.attendance-record.delete'] } },
    },
  ],
};
