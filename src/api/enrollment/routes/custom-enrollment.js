'use strict';

module.exports = {
    routes: [
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
