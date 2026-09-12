'use strict';

const { resolveFinanceAccessContext } = require('../../../utils/finance-access');
const { resolvePeriodRange } = require('../../../utils/period-buckets');

module.exports = {
  async generate(ctx) {
    try {
      const accessContext = await resolveFinanceAccessContext(strapi, ctx.state.user?.id);

      if (!accessContext) {
        return ctx.forbidden('Forbidden');
      }

      const filters = ctx.query.filters || {};
      const schoolYearId = filters.schoolYear?.id?.$eq;
      const requestedSchoolId = filters.school?.id?.$eq;

      if (!schoolYearId) {
        return ctx.badRequest('filters[schoolYear][id][$eq] is required.');
      }

      const schoolId =
        accessContext.scope === 'school' ? accessContext.schoolId : requestedSchoolId;

      const schoolYear = await strapi.db.query('api::school-year.school-year').findOne({
        where: { id: schoolYearId },
        select: ['startDate', 'endDate'],
      });

      if (!schoolYear) {
        return ctx.badRequest('School year not found.');
      }

      const { periodType = 'year', year, month, quarter, semester, from, to } = ctx.query;

      let range;
      try {
        range = resolvePeriodRange({
          periodType,
          year: year ? parseInt(year, 10) : undefined,
          month: month ? parseInt(month, 10) : undefined,
          quarter: quarter ? parseInt(quarter, 10) : undefined,
          semester: semester ? parseInt(semester, 10) : undefined,
          from,
          to,
          schoolYearStartDate: schoolYear.startDate,
          schoolYearEndDate: schoolYear.endDate,
        });
      } catch (error) {
        return ctx.badRequest(error.message);
      }

      const result = await strapi
        .service('api::financial-report.financial-report')
        .generateReport({
          accessContext,
          schoolId,
          schoolYearId,
          schoolYearStartDate: schoolYear.startDate,
          range,
        });

      ctx.send(result);
    } catch (error) {
      console.error('Error in financial-report generate endpoint:', error);
      ctx.throw(500, error.message);
    }
  },
};
