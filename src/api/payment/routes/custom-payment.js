'use strict';

/**
 * payment custom router
 */
module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/payments/stats',
            handler: 'payment.stats',
            config: {
                auth: { scope: ['api::payment.payment.find'] },
            },
        },
    ],
};