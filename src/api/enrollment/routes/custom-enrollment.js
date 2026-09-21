'use strict';

module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/enrollments/bulk-create',
            handler: 'enrollment.bulkCreate',
            config: {
                auth: { scope: ['api::enrollment.enrollment.create'] },
            },
        },
        {
            method: 'PUT',
            path: '/enrollments/:id/withdraw',
            handler: 'enrollment.markWithdrawn',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'PUT',
            path: '/enrollments/bulk/reorder',
            handler: 'enrollment.reorder',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'PUT',
            path: '/enrollments/:id/swap-number',
            handler: 'enrollment.swapNumber',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
