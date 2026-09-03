'use strict';

/**
 * fee-schedule router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::fee-schedule.fee-schedule');
