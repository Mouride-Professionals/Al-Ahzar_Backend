'use strict';

/**
 * expense service
 */

const { createCoreService } = require('@strapi/strapi').factories;

function relationId(value) {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'number' || typeof value === 'string') return value;
  if (Array.isArray(value)) return relationId(value[0]);
  if (value.id) return value.id;
  if (Array.isArray(value.connect)) return relationId(value.connect[0]);
  if (value.connect?.id) return value.connect.id;
  if (Array.isArray(value.set)) return relationId(value.set[0]);
  if (value.set?.id) return value.set.id;
  return undefined;
}

module.exports = createCoreService('api::expense.expense', ({ strapi }) => ({
  async validateExpense(data, options = {}) {
    let current = null;

    if (options.expenseId) {
      current = await strapi.entityService.findOne('api::expense.expense', options.expenseId, {
        populate: ['school', 'schoolYear'],
      });
    }

    const schoolId = relationId(data.school) || current?.school?.id;
    const schoolYearId = relationId(data.schoolYear) || current?.schoolYear?.id;
    const amount = data.amount !== undefined ? data.amount : current?.amount;
    const category = data.category || current?.category;

    if (!schoolId || !schoolYearId || !category || amount === undefined || amount === null) {
      throw new Error('École, année scolaire, catégorie et montant sont obligatoires.');
    }

    if (Number(amount) <= 0) {
      throw new Error('Le montant doit être supérieur à zéro.');
    }

    const expenseDate = data.expenseDate || current?.expenseDate;

    if (expenseDate) {
      const schoolYear = await strapi.entityService.findOne(
        'api::school-year.school-year',
        schoolYearId,
      );

      if (schoolYear) {
        if (schoolYear.startDate && expenseDate < schoolYear.startDate) {
          throw new Error("La date doit être comprise dans l'année scolaire sélectionnée.");
        }

        if (schoolYear.endDate && expenseDate > schoolYear.endDate) {
          throw new Error("La date doit être comprise dans l'année scolaire sélectionnée.");
        }
      }
    }
  },
}));
