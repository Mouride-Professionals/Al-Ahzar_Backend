'use strict';

/**
 * assessment router
 */

module.exports = {
  routes: [
    { method: 'GET', path: '/assessments', handler: 'api::assessment.assessment.find' },
    { method: 'GET', path: '/assessments/:id', handler: 'api::assessment.assessment.findOne' },
    { method: 'POST', path: '/assessments', handler: 'api::assessment.assessment.create' },
    { method: 'POST', path: '/assessments/generate-batch', handler: 'api::assessment.assessment.generateBatch' },
    { method: 'PUT', path: '/assessments/:id', handler: 'api::assessment.assessment.update' },
    { method: 'DELETE', path: '/assessments/:id', handler: 'api::assessment.assessment.delete' },
  ],
};
