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
    ],
};
