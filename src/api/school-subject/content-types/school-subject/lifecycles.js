const { errors } = require('@strapi/utils');

const { ApplicationError } = errors;

module.exports = {
    async beforeCreate(event) {
        await assertNotDuplicate(event.params.data);
    },

    async beforeUpdate(event) {
        const existing = await strapi.entityService.findOne(
            'api::school-subject.school-subject',
            event.params.where.id,
            { populate: ['school', 'subject'] }
        );

        if (!existing) {
            throw new ApplicationError('School subject not found.');
        }

        const schoolId = relationId(event.params.data.school) ?? existing.school?.id;
        const subjectId = relationId(event.params.data.subject) ?? existing.subject?.id;

        await assertNotDuplicate({ school: schoolId, subject: subjectId }, existing.id);
    },

    async beforeDelete(event) {
        const existing = await strapi.entityService.findOne(
            'api::school-subject.school-subject',
            event.params.where.id,
            { populate: ['school', 'subject'] }
        );

        if (!existing?.school || !existing?.subject) {
            return;
        }

        const [currentYear] = await strapi.entityService.findMany('api::school-year.school-year', {
            filters: { isCurrent: true },
            limit: 1,
        });

        if (!currentYear) {
            return;
        }

        const [classSubjectCount, assessmentCount] = await Promise.all([
            strapi.db.query('api::class-subject.class-subject').count({
                where: {
                    subject: existing.subject.id,
                    class: { school: existing.school.id, schoolYear: currentYear.id },
                },
            }),
            strapi.db.query('api::assessment.assessment').count({
                where: {
                    subject: existing.subject.id,
                    school: existing.school.id,
                    schoolYear: currentYear.id,
                },
            }),
        ]);

        if (classSubjectCount > 0 || assessmentCount > 0) {
            throw new ApplicationError(
                'This subject is used by classes of the current school year and cannot be removed.',
                { code: 'SUBJECT_IN_USE', classSubjectCount, assessmentCount }
            );
        }
    },
};

function relationId(value) {
    if (value === null || value === undefined) {
        return undefined;
    }

    if (typeof value !== 'object') {
        return value;
    }

    return value.id ?? value.connect?.[0]?.id ?? value.set?.[0]?.id;
}

async function assertNotDuplicate(data, excludeId = null) {
    const schoolId = relationId(data.school);
    const subjectId = relationId(data.subject);

    if (!schoolId || !subjectId) {
        return;
    }

    const duplicates = await strapi.entityService.findMany('api::school-subject.school-subject', {
        filters: { school: schoolId, subject: subjectId },
        limit: 2,
    });

    if (duplicates.some((d) => d.id !== excludeId)) {
        throw new ApplicationError('This school has already selected this subject.');
    }
}
