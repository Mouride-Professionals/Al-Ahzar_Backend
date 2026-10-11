const { errors } = require('@strapi/utils');

const { ApplicationError } = errors;

module.exports = {
    async beforeCreate(event) {
        await assertSubjectEnabledForClassSchool(event.params.data);
    },

    async beforeUpdate(event) {
        const existing = await strapi.entityService.findOne(
            'api::class-subject.class-subject',
            event.params.where.id,
            { populate: ['class', 'subject'] }
        );

        if (!existing) {
            throw new ApplicationError('Class subject not found.');
        }

        const classId = relationId(event.params.data.class) ?? existing.class?.id;
        const subjectId = relationId(event.params.data.subject) ?? existing.subject?.id;

        await assertSubjectEnabledForClassSchool({ class: classId, subject: subjectId });
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

async function assertSubjectEnabledForClassSchool(data) {
    const classId = relationId(data.class);
    const subjectId = relationId(data.subject);

    if (!classId || !subjectId) {
        return;
    }

    const klass = await strapi.entityService.findOne('api::class.class', classId, {
        populate: ['school'],
    });

    if (!klass?.school) {
        throw new ApplicationError('Class not found or has no school.');
    }

    const enabled = await strapi.entityService.findMany('api::school-subject.school-subject', {
        filters: { school: klass.school.id, subject: subjectId, isActive: true },
        limit: 1,
    });

    if (enabled.length === 0) {
        throw new ApplicationError(
            'This subject is not enabled for this class\'s school.',
            { code: 'SUBJECT_NOT_ENABLED' }
        );
    }
}
