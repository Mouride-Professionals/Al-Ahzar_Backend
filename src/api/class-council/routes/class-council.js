'use strict';

/**
 * class-council router
 */

module.exports = {
  routes: [
    { method: 'GET', path: '/class-councils', handler: 'api::class-council.class-council.find' },
    { method: 'GET', path: '/class-councils/:id', handler: 'api::class-council.class-council.findOne' },
    { method: 'POST', path: '/class-councils', handler: 'api::class-council.class-council.create' },
    { method: 'POST', path: '/class-councils/generate', handler: 'api::class-council.class-council.generate' },
    { method: 'POST', path: '/class-councils/:id/validate', handler: 'api::class-council.class-council.validateCouncil' },
    { method: 'PUT', path: '/class-councils/:id', handler: 'api::class-council.class-council.update' },
    { method: 'DELETE', path: '/class-councils/:id', handler: 'api::class-council.class-council.delete' },
  ],
};
