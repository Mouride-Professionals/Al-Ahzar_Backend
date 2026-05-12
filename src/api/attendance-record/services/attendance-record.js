'use strict';

/**
 * attendance-record service
 */

const { createCoreService } = require('@strapi/strapi').factories;

function relationId(value) {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  if (typeof value === 'number' || typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return relationId(value[0]);
  }

  if (value.id) {
    return value.id;
  }

  if (Array.isArray(value.connect)) {
    return relationId(value.connect[0]);
  }

  if (value.connect?.id) {
    return value.connect.id;
  }

  if (Array.isArray(value.set)) {
    return relationId(value.set[0]);
  }

  if (value.set?.id) {
    return value.set.id;
  }

  return undefined;
}

function getDuplicateFilters(data) {
  const enrollmentId = relationId(data.enrollment);
  const courseSessionId = relationId(data.courseSession);
  const duplicateFilters = {
    enrollment: { id: enrollmentId },
  };

  if (courseSessionId) {
    duplicateFilters.courseSession = { id: courseSessionId };
  } else {
    duplicateFilters.attendanceDate = data.attendanceDate;
  }

  return duplicateFilters;
}

module.exports = createCoreService('api::attendance-record.attendance-record', ({ strapi }) => ({
  async validateAttendanceRecord(data, options = {}) {
    const enrollmentId = relationId(data.enrollment);
    const classId = relationId(data.class);
    const schoolYearId = relationId(data.schoolYear);
    const schoolId = relationId(data.school);

    if (!enrollmentId || !classId || !schoolId || !schoolYearId || !data.attendanceDate || !data.status) {
      throw new Error('Inscription, classe, école, année scolaire, date et statut sont obligatoires.');
    }

    if (data.status === 'late' && Number(data.lateMinutes || 0) <= 0) {
      throw new Error('Le nombre de minutes de retard est obligatoire pour un retard.');
    }

    const enrollment = await strapi.entityService.findOne('api::enrollment.enrollment', enrollmentId, {
      populate: ['class', 'schoolYear'],
    });

    if (!enrollment) {
      throw new Error('Inscription introuvable.');
    }

    if (String(enrollment.class?.id) !== String(classId)) {
      throw new Error("L'inscription ne correspond pas à la classe sélectionnée.");
    }

    if (String(enrollment.schoolYear?.id) !== String(schoolYearId)) {
      throw new Error("L'inscription ne correspond pas à l'année scolaire sélectionnée.");
    }

    if (!options.allowExisting) {
      const existing = await strapi.entityService.findMany('api::attendance-record.attendance-record', {
        filters: getDuplicateFilters(data),
        limit: 1,
      });

      if (existing.length > 0) {
        throw new Error('Une présence existe déjà pour cette inscription et cette séance ou date.');
      }
    }
  },

  async bulkSave(payload, userId) {
    const records = Array.isArray(payload?.records) ? payload.records : [];

    if (records.length === 0) {
      throw new Error('Aucune présence fournie.');
    }

    const created = [];

    for (const record of records) {
      await strapi
        .service('api::attendance-record.attendance-record')
        .validateAttendanceRecord(record, { allowExisting: true });

      const existing = await strapi.entityService.findMany('api::attendance-record.attendance-record', {
        filters: getDuplicateFilters(record),
        limit: 1,
      });
      const data = {
        ...record,
        lateMinutes: record.status === 'late' ? record.lateMinutes : null,
        recordedAt: record.recordedAt || new Date().toISOString(),
        recordedBy: record.recordedBy || userId,
      };
      const entity = existing[0]
        ? await strapi.entityService.update(
            'api::attendance-record.attendance-record',
            existing[0].id,
            {
              data,
              populate: ['enrollment', 'courseSession', 'class', 'school', 'schoolYear', 'recordedBy'],
            }
          )
        : await strapi.entityService.create('api::attendance-record.attendance-record', {
            data,
            populate: ['enrollment', 'courseSession', 'class', 'school', 'schoolYear', 'recordedBy'],
          });
      created.push(entity);
    }

    return created;
  },
}));
