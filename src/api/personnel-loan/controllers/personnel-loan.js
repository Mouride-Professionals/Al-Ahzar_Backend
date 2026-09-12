'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const LOAN_UID = 'api::personnel-loan.personnel-loan';

module.exports = createCoreController(LOAN_UID, ({ strapi }) => ({
  async create(ctx) {
    const data = ctx.request.body?.data || ctx.request.body;

    try {
      await strapi.service(LOAN_UID).validateLoan(data);
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    data.status = 'active';

    const entity = await strapi.entityService.create(LOAN_UID, {
      data,
      populate: ['personnel', 'school', 'schoolYear'],
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const data = ctx.request.body?.data || ctx.request.body;

    try {
      await strapi.service(LOAN_UID).validateLoan(data, { loanId: id });
    } catch (error) {
      return ctx.badRequest(error.message);
    }

    await strapi.entityService.update(LOAN_UID, id, { data });
    await strapi.service(LOAN_UID).refreshStatus(id);

    const entity = await strapi.entityService.findOne(LOAN_UID, id, {
      populate: ['personnel', 'school', 'schoolYear', 'repayments'],
    });

    const sanitized = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitized);
  },
}));
