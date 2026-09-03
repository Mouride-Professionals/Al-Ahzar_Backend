'use strict';

/**
 * enrollment custom router
 */
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
    ],
};
