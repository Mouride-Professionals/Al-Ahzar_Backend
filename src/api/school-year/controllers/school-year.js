'use strict';

/**
 * school-year controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::school-year.school-year', ({ strapi }) => ({
    /**
     * Set a school year as current and remove current status from others
     */
    async setCurrent(ctx) {
        try {
            const { id } = ctx.params;
            const schoolYear = await strapi.entityService.findOne("api::school-year.school-year", id);

            if (!schoolYear) {
                return ctx.badRequest("School year not found");
            }

            // ❌ Prevent setting `isCurrent` if `isEnded` is true
            if (schoolYear.isEnded) {
                return ctx.badRequest("Cannot set as current because the school year has ended.");
            }

            // Remove current status from all school years
            await strapi.db.query("api::school-year.school-year").updateMany({
                where: { isCurrent: true },
                data: { isCurrent: false },
            });

            // Set the selected school year as current
            const updatedSchoolYear = await strapi.entityService.update("api::school-year.school-year", id, {
                data: { isCurrent: true },
            });

            return ctx.send({ message: "School year marked as current", schoolYear: updatedSchoolYear });
        } catch (error) {
            console.error(error);
            return ctx.badRequest("Error updating school year");
        }
    },

    /**
     * Mark a school year as ended
     */
    async setEnded(ctx) {
        try {
            const { id } = ctx.params;

            const schoolYear = await strapi.entityService.findOne("api::school-year.school-year", id);

            if (!schoolYear) {
                return ctx.badRequest("School year not found");
            }

            // Set the school year as ended
            const updatedSchoolYear = await strapi.entityService.update("api::school-year.school-year", id, {
                data: { isEnded: true, isCurrent: false }, // Ensure it's no longer current

            });

            return ctx.send({ message: "School year marked as ended", schoolYear: updatedSchoolYear });
        } catch (error) {
            console.error(error);
            return ctx.badRequest("Error updating school year");
        }
    },

  
}));
