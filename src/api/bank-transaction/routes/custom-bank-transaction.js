"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/bank-transactions/stats",
      handler: "bank-transaction.stats",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
