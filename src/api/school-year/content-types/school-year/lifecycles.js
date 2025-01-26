module.exports = {
    async beforeCreate(event) {
        const { data } = event.params;

        if (data.isCurrent) {
            // Ensure no other school year is marked as current
            const existingCurrent = await strapi.entityService.findMany(
                'api::school-year.school-year',
                { filters: { isCurrent: true }, limit: 1 }
            );

            if (existingCurrent.length > 0) {
                throw new Error('There is already a current school year.');
            }
        }
    },

    async beforeUpdate(event) {
        const { data } = event.params;

        if (data.isCurrent) {
            // Ensure no other school year is marked as current
            const existingCurrent = await strapi.entityService.findMany(
                'api::school-year.school-year',
                { filters: { isCurrent: true }, limit: 1 }
            );

            if (existingCurrent.length > 0) {
                const updatedId = event.params.where.id;
                const currentId = existingCurrent[0].id;

                if (currentId !== updatedId) {
                    throw new Error('There is already a current school year.');
                }
            }
        }

        if (data.isActive) {
            // Ensure no other school year is marked as active

            await strapi.db.query('api::school-year.school-year').updateMany({
                where: { isActive: true },
                data: { isActive: false },
            });


        }
    },
};
