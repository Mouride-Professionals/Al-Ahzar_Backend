'use strict';

/**
 * student controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::student.student', ({ strapi }) => ({
  // Default CRUD operations remain available

  /**
   * Download Excel template for bulk student import
   */
  async downloadTemplate(ctx) {
    try {
      const bulkImportService = strapi.service('api::student.bulk-import');
      const template = await bulkImportService.generateTemplate();

      ctx.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="Al-Azhar-Students-Template.xlsx"'
      });

      ctx.body = template;
    } catch (error) {
      ctx.throw(500, `Erreur lors de la génération du modèle: ${error.message}`);
    }
  },

  /**
   * Validate student data from uploaded file
   */
  async validateBulkImport(ctx) {
    try {
      // Debug: Log the entire request to see file structure
      console.log('Request files:', ctx.request.files);
      console.log('Request body:', ctx.request.body);

      // Try different ways to access the file
      const file = ctx.request.files?.file || ctx.request.files?.files?.[0] || ctx.request.files?.[0];

      if (!file) {
        return ctx.badRequest('Aucun fichier fourni');
      }

      console.log('File object:', file);

      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv'
      ];

      // Also check file extension as backup
      const fileName = file.name || file.originalFilename || '';
      const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
      const isCsv = fileName.endsWith('.csv');

      if (!allowedTypes.includes(file.mimetype) && !isExcel && !isCsv) {
        return ctx.throw(400, `Type de fichier non supporté. Fichier: ${fileName}, MIME: ${file.mimetype}. Utilisez Excel (.xlsx) ou CSV.`);
      }

      const bulkImportService = strapi.service('api::student.bulk-import');

      // Read file buffer properly
      let fileBuffer;
      if (file.buffer) {
        fileBuffer = file.buffer;
      } else if (file.filepath) {
        const fs = require('fs');
        fileBuffer = fs.readFileSync(file.filepath);
      } else if (file.path) {
        const fs = require('fs');
        fileBuffer = fs.readFileSync(file.path);
      } else if (typeof file === 'string') {
        // File might be a path string
        const fs = require('fs');
        fileBuffer = fs.readFileSync(file);
      } else {
        // Log available properties for debugging
        console.error('File object properties:', Object.keys(file));
        console.error('File object:', file);
        return ctx.throw(400, `Impossible de lire le fichier uploadé. Propriétés disponibles: ${Object.keys(file).join(', ')}`);
      }

      const results = await bulkImportService.processBulkImport(fileBuffer, {
        validateOnly: true
      });

      ctx.body = {
        success: true,
        message: 'Validation terminée',
        data: results
      };
    } catch (error) {
      ctx.throw(500, `Erreur lors de la validation: ${error.message}`);
    }
  },

  /**
   * Import students from uploaded Excel/CSV file
   */
  async bulkImport(ctx) {
    try {
      const { files, body } = ctx.request;

      if (!files || !files.file) {
        return ctx.throw(400, 'Aucun fichier fourni');
      }

      const file = files.file;
      const options = {
        validateOnly: false,
        skipErrors: body.skipErrors === 'true',
        generateIdentifiers: body.generateIdentifiers !== 'false'
      };

      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv'
      ];

      // Also check file extension as backup
      const fileName = file.name || file.originalFilename || '';
      const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
      const isCsv = fileName.endsWith('.csv');

      if (!allowedTypes.includes(file.mimetype) && !isExcel && !isCsv) {
        return ctx.throw(400, `Type de fichier non supporté. Fichier: ${fileName}, MIME: ${file.mimetype}. Utilisez Excel (.xlsx) ou CSV.`);
      }

      const bulkImportService = strapi.service('api::student.bulk-import');

      // Read file buffer properly
      let fileBuffer;
      if (file.buffer) {
        fileBuffer = file.buffer;
      } else if (file.filepath) {
        const fs = require('fs');
        fileBuffer = fs.readFileSync(file.filepath);
      } else if (file.path) {
        const fs = require('fs');
        fileBuffer = fs.readFileSync(file.path);
      } else if (typeof file === 'string') {
        // File might be a path string
        const fs = require('fs');
        fileBuffer = fs.readFileSync(file);
      } else {
        // Log available properties for debugging
        console.error('File object properties:', Object.keys(file));
        console.error('File object:', file);
        return ctx.throw(400, `Impossible de lire le fichier uploadé. Propriétés disponibles: ${Object.keys(file).join(', ')}`);
      }

      const results = await bulkImportService.processBulkImport(fileBuffer, options);

      ctx.body = {
        success: true,
        message: `Import terminé: ${results.success} créés, ${results.errors} erreurs`,
        data: results
      };
    } catch (error) {
      ctx.throw(500, `Erreur lors de l'import: ${error.message}`);
    }
  },

  /**
   * Get import statistics and recent imports
   */
  async getImportStats(ctx) {
    try {
      const totalStudents = await strapi.entityService.count('api::student.student');

      // Get students created in the last 30 days
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 30);

      const recentStudents = await strapi.entityService.count('api::student.student', {
        filters: {
          createdAt: {
            $gte: recentDate.toISOString()
          }
        }
      });

      // Get students by type
      const studentTypes = await strapi.db.query('api::student.student').findMany({
        select: ['type'],
        groupBy: ['type']
      });

      ctx.body = {
        success: true,
        data: {
          total: totalStudents,
          recent: recentStudents,
          types: studentTypes
        }
      };
    } catch (error) {
      ctx.throw(500, `Erreur lors de la récupération des statistiques: ${error.message}`);
    }
  }
}));
