'use strict';

const { computeEffectifs } = require('./effectifs');
const { computeImpayes } = require('./impayes');
const { buildMonthlyBreakdown } = require('../../../utils/period-buckets');

function extractTotal(res) {
  if (!res || res.total === null || res.total === undefined) return 0;
  return parseFloat(res.total) || 0;
}

async function listReportSchools({ strapi, accessContext, schoolId }) {
  if (schoolId) {
    const school = await strapi.db.query('api::school.school').findOne({
      where: { id: schoolId },
      select: ['name'],
    });
    return school ? [{ id: String(schoolId), name: school.name }] : [];
  }

  if (accessContext.scope !== 'global') {
    return [];
  }

  const schools = await strapi.db.query('api::school.school').findMany({
    select: ['id', 'name'],
    orderBy: { name: 'asc' },
  });

  return schools.map((s) => ({ id: String(s.id), name: s.name }));
}

async function computeRecettes({ knex, schoolId, schoolYearId, range }) {
  const buildBase = () =>
    knex('payments')
      .whereNot('payments.status', 'cancelled')
      .join('payments_enrollment_links', 'payments.id', 'payments_enrollment_links.payment_id')
      .join('enrollments', 'payments_enrollment_links.enrollment_id', 'enrollments.id')
      .join(
        'enrollments_school_year_links',
        'enrollments.id',
        'enrollments_school_year_links.enrollment_id'
      )
      .join('enrollments_class_links', 'enrollments.id', 'enrollments_class_links.enrollment_id')
      .join(
        'classes_school_links',
        'enrollments_class_links.class_id',
        'classes_school_links.class_id'
      )
      .andWhere('enrollments_school_year_links.school_year_id', schoolYearId)
      .andWhere('classes_school_links.school_id', schoolId)
      .andWhere('payments.created_at', '>=', range.from)
      .andWhere('payments.created_at', '<', range.to);

  const [totalRow, monthlyBreakdown, typeBreakdown] = await Promise.all([
    buildBase().sum({ total: 'payments.amount' }).first(),

    buildMonthlyBreakdown(knex, buildBase(), 'payments.created_at').sum({
      total: 'payments.amount',
    }),

    buildBase()
      .groupBy('payments.payment_type')
      .select('payments.payment_type as paymentType')
      .sum({ total: 'payments.amount' }),
  ]);

  return {
    total: extractTotal(totalRow),
    monthlyBreakdown: monthlyBreakdown.map((row) => ({
      year: row.year,
      month: row.month,
      total: extractTotal(row),
    })),
    paymentTypeBreakdown: typeBreakdown.map((row) => ({
      paymentType: row.paymentType,
      total: extractTotal(row),
    })),
  };
}

async function computeDepenses({ knex, schoolId, schoolYearId, range }) {
  const buildBase = () =>
    knex('expenses')
      .whereNot('expenses.status', 'cancelled')
      .join('expenses_school_links', 'expenses.id', 'expenses_school_links.expense_id')
      .join('expenses_school_year_links', 'expenses.id', 'expenses_school_year_links.expense_id')
      .andWhere('expenses_school_links.school_id', schoolId)
      .andWhere('expenses_school_year_links.school_year_id', schoolYearId)
      .andWhere('expenses.expense_date', '>=', range.from)
      .andWhere('expenses.expense_date', '<', range.to);

  const [totalRow, categoryBreakdown, monthlyBreakdown] = await Promise.all([
    buildBase().sum({ total: 'expenses.amount' }).first(),

    buildBase()
      .groupBy('expenses.category')
      .select('expenses.category as category')
      .sum({ total: 'expenses.amount' }),

    buildMonthlyBreakdown(knex, buildBase(), 'expenses.expense_date').sum({
      total: 'expenses.amount',
    }),
  ]);

  const totalByCategory = categoryBreakdown.reduce((acc, row) => {
    acc[row.category] = extractTotal(row);
    return acc;
  }, {});

  const total = extractTotal(totalRow);
  const salairesTotal = totalByCategory['Salaires'] || 0;

  return {
    total,
    salairesTotal,
    autresDepensesTotal: total - salairesTotal,
    totalByCategory,
    monthlyBreakdown: monthlyBreakdown.map((row) => ({
      year: row.year,
      month: row.month,
      total: extractTotal(row),
    })),
  };
}

async function computeVersements({ knex, schoolId, schoolYearId, range }) {
  const buildBase = () =>
    knex('bank_transactions')
      .join(
        'bank_transactions_school_links',
        'bank_transactions.id',
        'bank_transactions_school_links.bank_transaction_id'
      )
      .join(
        'bank_transactions_school_year_links',
        'bank_transactions.id',
        'bank_transactions_school_year_links.bank_transaction_id'
      )
      .andWhere('bank_transactions_school_links.school_id', schoolId)
      .andWhere('bank_transactions_school_year_links.school_year_id', schoolYearId)
      .andWhere('bank_transactions.transaction_date', '>=', range.from)
      .andWhere('bank_transactions.transaction_date', '<', range.to);

  const typeBreakdown = await buildBase()
    .groupBy('bank_transactions.type')
    .select('bank_transactions.type as type')
    .sum({ total: 'bank_transactions.amount' });

  const totalByType = typeBreakdown.reduce((acc, row) => {
    acc[row.type] = extractTotal(row);
    return acc;
  }, {});

  return {
    depotTotal: totalByType['Dépôt'] || 0,
    retraitTotal: totalByType['Retrait'] || 0,
    totalByType,
  };
}

async function computeFeeSchedule({ strapi, schoolId, schoolYearId }) {
  return strapi.db.query('api::fee-schedule.fee-schedule').findMany({
    where: { school: schoolId, schoolYear: schoolYearId },
    select: ['cycle', 'level', 'paymentType', 'amount'],
    orderBy: { cycle: 'asc', level: 'asc', paymentType: 'asc' },
  });
}

async function computeSchoolReport({ strapi, knex, school, schoolYearId, schoolYearStartDate, range }) {
  const [recettes, depenses, versements, effectifs, feeSchedule, impayes] = await Promise.all([
    computeRecettes({ knex, schoolId: school.id, schoolYearId, range }),
    computeDepenses({ knex, schoolId: school.id, schoolYearId, range }),
    computeVersements({ knex, schoolId: school.id, schoolYearId, range }),
    computeEffectifs({
      strapi,
      schoolId: school.id,
      schoolYearId,
      periodFrom: range.from,
      periodTo: range.to,
    }),
    computeFeeSchedule({ strapi, schoolId: school.id, schoolYearId }),
    computeImpayes({
      strapi,
      schoolId: school.id,
      schoolYearId,
      schoolYearStartDate,
      periodEnd: range.to,
    }),
  ]);

  return {
    schoolId: school.id,
    schoolName: school.name,
    effectifs,
    feeSchedule,
    recettes,
    versements,
    depenses,
    impayes,
    situationGenerale: {
      recettesTotal: recettes.total,
      depensesTotal: depenses.total,
      salairesTotal: depenses.salairesTotal,
      autresDepensesTotal: depenses.autresDepensesTotal,
      solde: recettes.total - depenses.total,
    },
  };
}

async function generateReport({ strapi, accessContext, schoolId, schoolYearId, schoolYearStartDate, range }) {
  const schools = await listReportSchools({ strapi, accessContext, schoolId });
  const knex = strapi.db.connection;

  const schoolReports = await Promise.all(
    schools.map((school) =>
      computeSchoolReport({ strapi, knex, school, schoolYearId, schoolYearStartDate, range })
    )
  );

  return {
    period: { from: range.from, to: range.to },
    schools: schoolReports,
  };
}

module.exports = ({ strapi }) => ({
  generateReport: (args) => generateReport({ strapi, ...args }),
});
