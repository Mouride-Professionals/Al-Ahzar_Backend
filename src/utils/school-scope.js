'use strict';

const { errors } = require('@strapi/utils');

const { ForbiddenError } = errors;

// Roles bound to a single school. Network-wide roles (DG, SG, SGF, service account) are not scoped.
const SCHOOL_SCOPED_ROLES = new Set([
    'directeur_etablissment',
    'adjoint_directeur_etablissment',
    'caissier',
    'adjoint_caissier',
    'surveillant_general',
    'adjoint_surveillant_general',
]);

// Relation path from each model to its owning school. An empty path means the record is the school.
const SCHOOL_PATHS = {
    'api::school.school': [],
    'api::academic-period.academic-period': ['school'],
    'api::assessment.assessment': ['school'],
    'api::attendance-record.attendance-record': ['school'],
    'api::bank-transaction.bank-transaction': ['school'],
    'api::class.class': ['school'],
    'api::class-council.class-council': ['school'],
    'api::class-council-student.class-council-student': ['school'],
    'api::course-session.course-session': ['school'],
    'api::expense.expense': ['school'],
    'api::fee-schedule.fee-schedule': ['school'],
    'api::grade-entry.grade-entry': ['school'],
    'api::personnel.personnel': ['school'],
    'api::personnel-loan.personnel-loan': ['school'],
    'api::school-subject.school-subject': ['school'],
    'api::teacher.teacher': ['school'],
    'api::timetable-slot.timetable-slot': ['school'],
    'api::class-subject.class-subject': ['class', 'school'],
    'api::enrollment.enrollment': ['class', 'school'],
    'api::payment.payment': ['enrollment', 'class', 'school'],
    'plugin::users-permissions.user': ['school'],
};

function forbid() {
    throw new ForbiddenError('You can only modify data belonging to your own school.');
}

function sameId(a, b) {
    return a !== null && a !== undefined && b !== null && b !== undefined && String(a) === String(b);
}

// undefined = relation not provided, null = explicitly cleared, otherwise the related id.
function refId(value) {
    if (value === undefined) return undefined;
    if (value === null) return null;
    if (Array.isArray(value)) return value.length ? refId(value[0]) : null;
    if (typeof value === 'object') {
        if ('id' in value) return value.id;
        if (value.set) return refId(value.set);
        if (value.connect?.length) return refId(value.connect[0]);
        if (value.disconnect?.length) return null;
        return undefined;
    }
    return value;
}

async function getScope() {
    const ctx = strapi.requestContext.get();

    if (!ctx?.state?.user || ctx.state.auth?.strategy?.name !== 'users-permissions') {
        return null;
    }

    if (ctx.state.schoolScope !== undefined) {
        return ctx.state.schoolScope;
    }

    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { id: ctx.state.user.id },
        populate: ['role', 'school'],
    });

    ctx.state.schoolScope = SCHOOL_SCOPED_ROLES.has(user?.role?.type)
        ? { schoolId: user.school?.id ?? null }
        : null;

    return ctx.state.schoolScope;
}

function buildPopulate(path) {
    const [head, ...rest] = path;
    return { [head]: rest.length ? { populate: buildPopulate(rest) } : true };
}

async function schoolOfRecord(uid, path, id) {
    if (path.length === 0) {
        return id;
    }

    const record = await strapi.db.query(uid).findOne({
        where: { id },
        select: ['id'],
        populate: buildPopulate(path),
    });

    let node = record;
    for (const key of path) {
        node = node?.[key];
    }

    return node?.id ?? null;
}

async function schoolFromData(uid, path, data) {
    const [head, ...rest] = path;
    const ref = refId(data?.[head]);

    if (ref === undefined || ref === null || rest.length === 0) {
        return ref;
    }

    const target = strapi.getModel(uid).attributes[head].target;
    return schoolOfRecord(target, rest, ref);
}

async function assertCanCreate(uid, path, data, scope) {
    if (path.length === 0) {
        forbid();
    }

    const school = await schoolFromData(uid, path, data);

    if (school === undefined && path.length === 1) {
        data[path[0]] = scope.schoolId;
        return;
    }

    if (!sameId(school, scope.schoolId)) {
        forbid();
    }
}

async function assertCanModify(uid, path, id, data, scope) {
    const current = await schoolOfRecord(uid, path, id);

    // A record not yet attached to any school (e.g. an unassigned teacher) may be claimed, not taken.
    if (current !== null && !sameId(current, scope.schoolId)) {
        forbid();
    }

    if (data && path.length > 0) {
        const next = await schoolFromData(uid, path, data);

        if (next !== undefined && !sameId(next, scope.schoolId)) {
            forbid();
        }
    }
}

async function idsMatching(uid, where) {
    const rows = await strapi.db.query(uid).findMany({ where, select: ['id'] });
    return rows.map((row) => row.id);
}

function singleId(where) {
    const id = where?.id;
    return id !== undefined && (typeof id === 'number' || typeof id === 'string') ? id : undefined;
}

function registerSchoolScope(strapiInstance) {
    const models = Object.keys(SCHOOL_PATHS).filter((uid) => strapiInstance.getModel(uid));

    strapiInstance.db.lifecycles.subscribe({
        models,

        async beforeCreate(event) {
            const scope = await getScope();
            if (!scope) return;
            if (!scope.schoolId) forbid();

            await assertCanCreate(event.model.uid, SCHOOL_PATHS[event.model.uid], event.params.data, scope);
        },

        async beforeCreateMany(event) {
            const scope = await getScope();
            if (!scope) return;
            if (!scope.schoolId) forbid();

            for (const data of event.params.data ?? []) {
                await assertCanCreate(event.model.uid, SCHOOL_PATHS[event.model.uid], data, scope);
            }
        },

        async beforeUpdate(event) {
            const scope = await getScope();
            if (!scope) return;
            if (!scope.schoolId) forbid();

            const uid = event.model.uid;
            const id = singleId(event.params.where);
            const ids = id !== undefined ? [id] : await idsMatching(uid, event.params.where);

            for (const recordId of ids) {
                await assertCanModify(uid, SCHOOL_PATHS[uid], recordId, event.params.data, scope);
            }
        },

        async beforeUpdateMany(event) {
            const scope = await getScope();
            if (!scope) return;
            if (!scope.schoolId) forbid();

            const uid = event.model.uid;
            for (const recordId of await idsMatching(uid, event.params.where)) {
                await assertCanModify(uid, SCHOOL_PATHS[uid], recordId, event.params.data, scope);
            }
        },

        async beforeDelete(event) {
            const scope = await getScope();
            if (!scope) return;
            if (!scope.schoolId) forbid();

            const uid = event.model.uid;
            const id = singleId(event.params.where);
            const ids = id !== undefined ? [id] : await idsMatching(uid, event.params.where);

            for (const recordId of ids) {
                await assertCanModify(uid, SCHOOL_PATHS[uid], recordId, null, scope);
            }
        },

        async beforeDeleteMany(event) {
            const scope = await getScope();
            if (!scope) return;
            if (!scope.schoolId) forbid();

            const uid = event.model.uid;
            for (const recordId of await idsMatching(uid, event.params.where)) {
                await assertCanModify(uid, SCHOOL_PATHS[uid], recordId, null, scope);
            }
        },
    });

    strapiInstance.log.info(`[school-scope] Write guard active on ${models.length} models.`);
}

module.exports = { registerSchoolScope, SCHOOL_SCOPED_ROLES, SCHOOL_PATHS };
