'use strict';

/**
 * personnel service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::personnel.personnel');
