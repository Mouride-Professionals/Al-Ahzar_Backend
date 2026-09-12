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
        populate: ['school', 'schoolYear', 'personnelBeneficiary'],
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

    const personnelBeneficiaryId =
      data.personnelBeneficiary !== undefined
        ? relationId(data.personnelBeneficiary)
        : current?.personnelBeneficiary?.id;

    if (category === 'Salaires' && !personnelBeneficiaryId) {
      throw new Error('Un membre du personnel bénéficiaire est obligatoire pour un paiement de salaire.');
    }

    if (category !== 'Salaires' && personnelBeneficiaryId) {
      throw new Error('Un bénéficiaire ne peut être renseigné que pour la catégorie "Salaires".');
    }

    const monthOf = data.monthOf !== undefined ? data.monthOf : current?.monthOf;

    if (category === 'Salaires' && !monthOf) {
      throw new Error('Le mois payé est obligatoire pour un paiement de salaire.');
    }

    if (category !== 'Salaires' && data.monthOf) {
      throw new Error('Le mois payé ne peut être renseigné que pour la catégorie "Salaires".');
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

  // Returns the normalized deductions ({ loanId, amount }) to record against a
  // salary payment. Salary expenses stay at their gross amount; deductions only
  // reduce what the loan still owes. Zero amounts mean "skip this month".
  async validateLoanDeductions(loanDeductions, data) {
    const entries = (Array.isArray(loanDeductions) ? loanDeductions : [])
      .map((deduction) => ({
        amount: Number(deduction?.amount),
        loanId: relationId(deduction?.loan),
      }))
      .filter((deduction) => deduction.amount > 0);

    if (entries.length === 0) {
      return [];
    }

    if (data.category !== 'Salaires') {
      throw new Error('Les prélèvements de prêt ne concernent que les paiements de salaire.');
    }

    const personnelBeneficiaryId = relationId(data.personnelBeneficiary);
    const loanService = strapi.service('api::personnel-loan.personnel-loan');
    const seenLoanIds = new Set();
    let total = 0;

    for (const entry of entries) {
      if (!entry.loanId) {
        throw new Error('Prêt invalide.');
      }

      if (seenLoanIds.has(String(entry.loanId))) {
        throw new Error("Un même prêt ne peut être prélevé qu'une seule fois par paiement.");
      }

      seenLoanIds.add(String(entry.loanId));

      const loan = await strapi.entityService.findOne(
        'api::personnel-loan.personnel-loan',
        entry.loanId,
        { populate: ['personnel'] },
      );

      if (!loan) {
        throw new Error('Prêt introuvable.');
      }

      if (String(loan.personnel?.id) !== String(personnelBeneficiaryId)) {
        throw new Error("Ce prêt n'appartient pas au bénéficiaire du salaire.");
      }

      if (loan.status !== 'active') {
        throw new Error("Ce prêt n'est plus actif.");
      }

      const remaining = Number(loan.amount) - (await loanService.getRepaidTotal(loan.id));

      if (entry.amount > remaining) {
        throw new Error('Le prélèvement dépasse le reste à rembourser du prêt.');
      }

      total += entry.amount;
    }

    if (total > Number(data.amount)) {
      throw new Error('Le total des prélèvements dépasse le salaire brut.');
    }

    return entries;
  },

  // Guards a plain field edit (amount/date/category/...), as opposed to a
  // cancellation (see cancelExpense below). Salary payments are cancel-only,
  // never edited — mirrors how student payments work (cancel + re-record
  // instead of mutating history) and avoids ever having to reconcile a
  // changed amount/beneficiary against loan-repayment records already
  // linked to this expense. A cancelled expense of any category is frozen.
  async assertCanEditFields(expenseId) {
    const current = await strapi.entityService.findOne('api::expense.expense', expenseId, {
      select: ['category', 'status'],
    });

    if (!current) {
      throw new Error('Dépense introuvable.');
    }

    if (current.status === 'cancelled') {
      throw new Error('Cette dépense est annulée : elle ne peut plus être modifiée.');
    }

    if (current.category === 'Salaires') {
      throw new Error(
        "Un paiement de salaire ne peut pas être modifié — annulez-le et enregistrez un nouveau paiement.",
      );
    }
  },

  // The only sanctioned way to remove an expense from the books: a soft
  // cancel with a mandatory reason, kept for audit — mirrors payment
  // cancellation. Reverses any linked loan repayment, since the money was
  // never actually applied toward the loan if the payment is voided.
  async cancelExpense(expenseId, cancellationReason) {
    const reason = (cancellationReason || '').trim();

    if (!reason) {
      throw new Error("La raison de l'annulation est obligatoire.");
    }

    const current = await strapi.entityService.findOne('api::expense.expense', expenseId, {
      select: ['status'],
    });

    if (!current) {
      throw new Error('Dépense introuvable.');
    }

    if (current.status === 'cancelled') {
      throw new Error('Cette dépense est déjà annulée.');
    }

    const repayments = await strapi.db.query('api::loan-repayment.loan-repayment').findMany({
      where: { expense: expenseId },
      select: ['id'],
    });

    for (const repayment of repayments) {
      await strapi.entityService.delete('api::loan-repayment.loan-repayment', repayment.id);
    }

    return {
      status: 'cancelled',
      cancellationReason: reason,
      cancelledAt: new Date().toISOString().slice(0, 10),
    };
  },
}));
