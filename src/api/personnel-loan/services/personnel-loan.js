'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

const LOAN_UID = 'api::personnel-loan.personnel-loan';
const REPAYMENT_UID = 'api::loan-repayment.loan-repayment';

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

async function getRepaidTotal(strapi, loanId) {
  const repayments = await strapi.db.query(REPAYMENT_UID).findMany({
    where: { loan: loanId },
    select: ['amount'],
  });

  return repayments.reduce((sum, repayment) => sum + (Number(repayment.amount) || 0), 0);
}

module.exports = createCoreService(LOAN_UID, ({ strapi }) => ({
  getRepaidTotal(loanId) {
    return getRepaidTotal(strapi, loanId);
  },

  // "repaid" is always derived from repayments; only "cancelled" is a manual state.
  async refreshStatus(loanId) {
    const loan = await strapi.db.query(LOAN_UID).findOne({
      where: { id: loanId },
      select: ['id', 'amount', 'status'],
    });

    if (!loan || loan.status === 'cancelled') {
      return;
    }

    const repaid = await getRepaidTotal(strapi, loanId);
    const nextStatus = repaid >= Number(loan.amount) ? 'repaid' : 'active';

    if (nextStatus !== loan.status) {
      await strapi.db.query(LOAN_UID).update({
        where: { id: loanId },
        data: { status: nextStatus },
      });
    }
  },

  async validateLoan(data, options = {}) {
    let current = null;

    if (options.loanId) {
      current = await strapi.entityService.findOne(LOAN_UID, options.loanId, {
        populate: ['personnel', 'school', 'schoolYear'],
      });

      if (!current) {
        throw new Error('Prêt introuvable.');
      }
    }

    const personnelId =
      data.personnel !== undefined ? relationId(data.personnel) : current?.personnel?.id;
    const schoolId = data.school !== undefined ? relationId(data.school) : current?.school?.id;
    const schoolYearId =
      data.schoolYear !== undefined ? relationId(data.schoolYear) : current?.schoolYear?.id;
    const loanType = data.loanType ?? current?.loanType;
    const amount = Number(data.amount ?? current?.amount);
    const loanDate = data.loanDate ?? current?.loanDate;

    if (!personnelId || !schoolId || !schoolYearId || !loanType || !loanDate) {
      throw new Error('Personnel, école, année scolaire, type et date du prêt sont obligatoires.');
    }

    if (!['installment', 'lump_sum'].includes(loanType)) {
      throw new Error('Type de prêt invalide.');
    }

    if (!(amount > 0)) {
      throw new Error('Le montant du prêt doit être supérieur à zéro.');
    }

    if (loanType === 'lump_sum') {
      data.installmentAmount = amount;
    } else {
      const installmentAmount = Number(data.installmentAmount ?? current?.installmentAmount);

      if (!(installmentAmount > 0)) {
        throw new Error('La mensualité doit être supérieure à zéro.');
      }

      if (installmentAmount > amount) {
        throw new Error('La mensualité ne peut pas dépasser le montant du prêt.');
      }
    }

    if (data.status !== undefined && !['active', 'cancelled'].includes(data.status)) {
      delete data.status;
    }

    const personnel = await strapi.entityService.findOne('api::personnel.personnel', personnelId, {
      populate: ['school'],
    });

    if (!personnel) {
      throw new Error('Membre du personnel introuvable.');
    }

    if (personnel.school && String(personnel.school.id) !== String(schoolId)) {
      throw new Error("Ce membre du personnel n'appartient pas à cette école.");
    }

    const schoolYear = await strapi.entityService.findOne('api::school-year.school-year', schoolYearId);

    if (
      schoolYear &&
      ((schoolYear.startDate && loanDate < schoolYear.startDate) ||
        (schoolYear.endDate && loanDate > schoolYear.endDate))
    ) {
      throw new Error("La date du prêt doit être comprise dans l'année scolaire sélectionnée.");
    }

    if (options.loanId) {
      const repaid = await getRepaidTotal(strapi, options.loanId);

      if (amount < repaid) {
        throw new Error('Le montant du prêt ne peut pas être inférieur au total déjà remboursé.');
      }

      if (data.status === 'cancelled' && repaid > 0) {
        throw new Error("Impossible d'annuler un prêt dont une partie a déjà été remboursée.");
      }
    }
  },
}));
