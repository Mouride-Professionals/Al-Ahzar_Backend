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

const STUDENT_UID = 'api::student.student';

// Marks the guard's own lookups so they see every school and never recurse into the guard.
const BYPASS = '__schoolScopeBypass';
const APPLIED = Symbol('schoolScopeApplied');

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

async function loadScope(userId) {
    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { id: userId },
        populate: ['role', 'school'],
        [BYPASS]: true,
    });

    return SCHOOL_SCOPED_ROLES.has(user?.role?.type) ? { schoolId: user.school?.id ?? null } : null;
}

function getScope() {
    const ctx = strapi.requestContext.get();

    if (!ctx?.state?.user || ctx.state.auth?.strategy?.name !== 'users-permissions') {
        return Promise.resolve(null);
    }

    ctx.state.schoolScopePromise ??= loadScope(ctx.state.user.id);
    return ctx.state.schoolScopePromise;
}

function buildPopulate(path) {
    const [head, ...rest] = path;
    return { [head]: rest.length ? { populate: buildPopulate(rest) } : true };
}

function nestCondition(path, schoolId) {
    return path.reduceRight((condition, key) => ({ [key]: condition }), { id: schoolId });
}

function readCondition(uid, schoolId) {
    // A scoped user without a school sees nothing; primary keys are never null.
    if (!schoolId) {
        return { id: { $null: true } };
    }

    if (uid === STUDENT_UID) {
        // Students belong to a school only through enrollments; not-yet-enrolled students stay visible.
        return {
            $or: [
                { enrollments: { class: { school: { id: schoolId } } } },
                { enrollments: { id: { $null: true } } },
            ],
        };
    }

    return nestCondition(SCHOOL_PATHS[uid], schoolId);
}

async function schoolOfRecord(uid, path, id) {
    if (path.length === 0) {
        return id;
    }

    const record = await strapi.db.query(uid).findOne({
        where: { id },
        select: ['id'],
        populate: buildPopulate(path),
        [BYPASS]: true,
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

    // Records with no school (e.g. an unassigned teacher) are assigned by network roles only.
    if (!sameId(current, scope.schoolId)) {
        forbid();
    }

    if (data && path.length > 0) {
        const next = await schoolFromData(uid, path, data);

        if (next !== undefined && !sameId(next, scope.schoolId)) {
            forbid();
        }
    }
}

// Students carry no school: one is ours if enrolled in our school, or not enrolled anywhere yet.
async function assertStudentAccessible(id, scope) {
    const student = await strapi.db.query(STUDENT_UID).findOne({
        where: { id },
        select: ['id'],
        populate: { enrollments: { populate: { class: { populate: { school: true } } } } },
        [BYPASS]: true,
    });

    const schoolIds = (student?.enrollments ?? []).map((enrollment) => enrollment.class?.school?.id);

    if (schoolIds.length > 0 && !schoolIds.some((schoolId) => sameId(schoolId, scope.schoolId))) {
        forbid();
    }
}

function modifyCheck(uid, scope, data) {
    return uid === STUDENT_UID
        ? (id) => assertStudentAccessible(id, scope)
        : (id) => assertCanModify(uid, SCHOOL_PATHS[uid], id, data, scope);
}

async function idsMatching(uid, where) {
    const rows = await strapi.db.query(uid).findMany({ where, select: ['id'], [BYPASS]: true });
    return rows.map((row) => row.id);
}

function singleId(where) {
    const id = where?.id;
    return id !== undefined && (typeof id === 'number' || typeof id === 'string') ? id : undefined;
}

async function writeScope(event) {
    const scope = await getScope();
    if (!scope) return null;
    if (!scope.schoolId) forbid();

    return scope;
}

// Reads are scoped only for GET requests: write requests run integrity checks (duplicate students,
// double enrollments, safe delete) that must see every school, and the write guard covers them.
async function restrictRead(event) {
    const params = event.params;
    if (!params || params[BYPASS] || params[APPLIED]) return;

    const method = strapi.requestContext.get()?.method;
    if (method !== 'GET' && method !== 'HEAD') return;

    const scope = await getScope();
    if (!scope || params[APPLIED]) return;

    const condition = readCondition(event.model.uid, scope.schoolId);
    params.where = params.where ? { $and: [params.where, condition] } : condition;
    params[APPLIED] = true;
}

function registerSchoolScope(strapiInstance) {
    const models = [...Object.keys(SCHOOL_PATHS), STUDENT_UID].filter((uid) =>
        strapiInstance.getModel(uid),
    );

    strapiInstance.db.lifecycles.subscribe({
        models,

        beforeFindMany: restrictRead,
        beforeFindOne: restrictRead,
        beforeCount: restrictRead,

        async beforeCreate(event) {
            if (event.model.uid === STUDENT_UID) return;
            const scope = await writeScope(event);
            if (!scope) return;

            await assertCanCreate(event.model.uid, SCHOOL_PATHS[event.model.uid], event.params.data, scope);
        },

        async beforeCreateMany(event) {
            if (event.model.uid === STUDENT_UID) return;
            const scope = await writeScope(event);
            if (!scope) return;

            for (const data of event.params.data ?? []) {
                await assertCanCreate(event.model.uid, SCHOOL_PATHS[event.model.uid], data, scope);
            }
        },

        async beforeUpdate(event) {
            const scope = await writeScope(event);
            if (!scope) return;

            const uid = event.model.uid;
            const id = singleId(event.params.where);
            const ids = id !== undefined ? [id] : await idsMatching(uid, event.params.where);
            const check = modifyCheck(uid, scope, event.params.data);

            for (const recordId of ids) {
                await check(recordId);
            }
        },

        async beforeUpdateMany(event) {
            const scope = await writeScope(event);
            if (!scope) return;

            const uid = event.model.uid;
            const check = modifyCheck(uid, scope, event.params.data);

            for (const recordId of await idsMatching(uid, event.params.where)) {
                await check(recordId);
            }
        },

        async beforeDelete(event) {
            const scope = await writeScope(event);
            if (!scope) return;

            const uid = event.model.uid;
            const id = singleId(event.params.where);
            const ids = id !== undefined ? [id] : await idsMatching(uid, event.params.where);
            const check = modifyCheck(uid, scope, null);

            for (const recordId of ids) {
                await check(recordId);
            }
        },

        async beforeDeleteMany(event) {
            const scope = await writeScope(event);
            if (!scope) return;

            const uid = event.model.uid;
            const check = modifyCheck(uid, scope, null);

            for (const recordId of await idsMatching(uid, event.params.where)) {
                await check(recordId);
            }
        },
    });

    strapiInstance.log.info(`[school-scope] Read/write guard active on ${models.length} models.`);
}

module.exports = { registerSchoolScope, SCHOOL_SCOPED_ROLES, SCHOOL_PATHS };
