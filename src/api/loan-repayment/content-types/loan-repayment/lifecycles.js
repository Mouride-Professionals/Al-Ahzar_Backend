'use strict';

// Keeps the parent loan's status (active/repaid) in sync with its repayments.

async function loanIdForRepayment(repaymentId) {
  if (!repaymentId) return null;

  const repayment = await strapi.db.query('api::loan-repayment.loan-repayment').findOne({
    where: { id: repaymentId },
    populate: ['loan'],
  });

  return repayment?.loan?.id ?? null;
}

async function refreshLoan(loanId) {
  if (loanId) {
    await strapi.service('api::personnel-loan.personnel-loan').refreshStatus(loanId);
  }
}

module.exports = {
  async afterCreate(event) {
    await refreshLoan(await loanIdForRepayment(event.result?.id));
  },

  async beforeUpdate(event) {
    event.state.previousLoanId = await loanIdForRepayment(event.params.where?.id);
  },

  async afterUpdate(event) {
    const loanId = await loanIdForRepayment(event.result?.id);
    await refreshLoan(loanId);

    if (event.state.previousLoanId && event.state.previousLoanId !== loanId) {
      await refreshLoan(event.state.previousLoanId);
    }
  },

  async beforeDelete(event) {
    event.state.loanId = await loanIdForRepayment(event.params.where?.id);
  },

  async afterDelete(event) {
    await refreshLoan(event.state.loanId);
  },
};
