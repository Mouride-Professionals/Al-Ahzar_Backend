'use strict';

/**
 * student router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

// Create the default router
const defaultRouter = createCoreRouter('api::student.student');

// Add custom routes
module.exports = {
    routes: [
        // Include default CRUD routes
        {
            method: 'GET',
            path: '/students',
            handler: 'api::student.student.find',
            config: {
                auth: {
                    scope: ['api::student.student.find']
                }
            }
        },
        {
            method: 'GET',
            path: '/students/:id',
            handler: 'api::student.student.findOne',
            config: {
                auth: {
                    scope: ['api::student.student.findOne']
                }
            }
        },
        {
            method: 'POST',
            path: '/students',
            handler: 'api::student.student.create',
            config: {
                auth: {
                    scope: ['api::student.student.create']
                }
            }
        },
        {
            method: 'PUT',
            path: '/students/:id',
            handler: 'api::student.student.update',
            config: {
                auth: {
                    scope: ['api::student.student.update']
                }
            }
        },
        {
            method: 'DELETE',
            path: '/students/:id',
            handler: 'api::student.student.delete',
            config: {
                auth: {
                    scope: ['api::student.student.delete']
                }
            }
        },

        // Custom bulk import routes
        {
            method: 'GET',
            path: '/students/bulk/template',
            handler: 'api::student.student.downloadTemplate',
            config: {
                auth: {
                    scope: ['api::student.student.downloadTemplate']
                }
            }
        },
        {
            method: 'POST',
            path: '/students/bulk/validate',
            handler: 'api::student.student.validateBulkImport',
            config: {
                auth: {
                    scope: ['api::student.student.validateBulkImport']
                },
                parser: {
                    formidable: {
                        maxFileSize: 10 * 1024 * 1024, // 10MB limit
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/students/bulk/import',
            handler: 'api::student.student.bulkImport',
            config: {
                auth: {
                    scope: ['api::student.student.bulkImport']
                },
                parser: {
                    formidable: {
                        maxFileSize: 10 * 1024 * 1024, // 10MB limit
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/students/bulk/stats',
            handler: 'api::student.student.getImportStats',
            config: {
                auth: {
                    scope: ['api::student.student.getImportStats']
                }
            }
        }
    ]
};
