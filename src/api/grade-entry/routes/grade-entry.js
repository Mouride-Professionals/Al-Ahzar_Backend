'use strict';

/**
 * grade-entry router
 */

module.exports = {
  routes: [
    { method: 'GET', path: '/grade-entries', handler: 'api::grade-entry.grade-entry.find' },
    { method: 'GET', path: '/grade-entries/summary', handler: 'api::grade-entry.grade-entry.summary' },
    { method: 'GET', path: '/grade-entries/:id', handler: 'api::grade-entry.grade-entry.findOne' },
    { method: 'POST', path: '/grade-entries', handler: 'api::grade-entry.grade-entry.create' },
    { method: 'POST', path: '/grade-entries/bulk', handler: 'api::grade-entry.grade-entry.bulk' },
    { method: 'PUT', path: '/grade-entries/:id', handler: 'api::grade-entry.grade-entry.update' },
    { method: 'DELETE', path: '/grade-entries/:id', handler: 'api::grade-entry.grade-entry.delete' },
  ],
};
