'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/financial-reports',
      handler: 'financial-report.generate',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
