'use strict';

/**
 * timetable-slot service
 */

const { createCoreService } = require('@strapi/strapi').factories;

const RELATION_KEYS = ['class', 'teacher', 'subject', 'school', 'schoolYear'];

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

function normalizeTime(value) {
  if (!value) {
    return value;
  }

  const [time, milliseconds] = String(value).split('.');
  const [hours, minutes, seconds] = time.split(':');

  return [
    (hours || '00').padStart(2, '0'),
    (minutes || '00').padStart(2, '0'),
    (seconds || '00').padStart(2, '0'),
  ].join(':') + '.' + (milliseconds || '000').padEnd(3, '0').slice(0, 3);
}

module.exports = createCoreService('api::timetable-slot.timetable-slot', ({ strapi }) => ({
  normalizeTime,

  buildWeeklyFilters(query = {}) {
    const filters = {};

    if (query.status) {
      filters.status = query.status;
    } else {
      filters.status = 'active';
    }

    for (const key of RELATION_KEYS) {
      const id = query[key] || query[`${key}Id`];
      if (id) {
        filters[key] = { id };
      }
    }

    return filters;
  },

  async validateTimetableSlot(data, options = {}) {
    const slotId = options.slotId;
    let current = null;

    if (slotId) {
      current = await strapi.entityService.findOne('api::timetable-slot.timetable-slot', slotId, {
        populate: ['class', 'school', 'schoolYear'],
      });
    }

    const classId = relationId(data.class) || current?.class?.id;
    const schoolId = relationId(data.school) || current?.school?.id;
    const schoolYearId = relationId(data.schoolYear) || current?.schoolYear?.id;
    const dayOfWeek = data.dayOfWeek || current?.dayOfWeek;
    const startTime = normalizeTime(data.startTime || current?.startTime);
    const endTime = normalizeTime(data.endTime || current?.endTime);
    const status = data.status || current?.status || 'active';

    if (!classId || !schoolId || !schoolYearId || !dayOfWeek || !startTime || !endTime) {
      throw new Error('Classe, école, année scolaire, jour, heure de début et heure de fin sont obligatoires.');
    }

    if (startTime >= endTime) {
      throw new Error("L'heure de début doit être antérieure à l'heure de fin.");
    }

    const classEntity = await strapi.entityService.findOne('api::class.class', classId, {
      populate: ['school', 'schoolYear'],
    });

    if (!classEntity) {
      throw new Error('Classe introuvable.');
    }

    if (String(classEntity.school?.id) !== String(schoolId)) {
      throw new Error("La classe ne correspond pas à l'école sélectionnée.");
    }

    if (String(classEntity.schoolYear?.id) !== String(schoolYearId)) {
      throw new Error("La classe ne correspond pas à l'année scolaire sélectionnée.");
    }

    if (status !== 'active') {
      return;
    }

    const overlapFilters = {
      class: { id: classId },
      dayOfWeek,
      status: 'active',
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    };

    if (slotId) {
      overlapFilters.id = { $ne: slotId };
    }

    const overlaps = await strapi.entityService.findMany('api::timetable-slot.timetable-slot', {
      filters: overlapFilters,
      limit: 1,
    });

    if (overlaps.length > 0) {
      throw new Error('Un autre créneau actif existe déjà pour cette classe sur cet intervalle.');
    }
  },
}));
