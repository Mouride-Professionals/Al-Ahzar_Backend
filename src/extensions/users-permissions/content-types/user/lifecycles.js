// module.exports = {
//     async afterCreate(event) {
//         const { result } = event;

//         // Only send confirmation email if user is unconfirmed
//         if (!result.confirmed) {
//             try {
//                 await strapi
//                     .plugin('users-permissions')
//                     .service('user')
//                     .sendConfirmationEmail(result);
//             } catch (error) {
//                 strapi.log.error('Failed to send confirmation email:', error);
//             }
//         }
//     },
// };
module.exports = {
    async afterCreate(event) {
        const { result } = event;
        strapi.log.info(`User created: ${result.email}, confirmed: ${result.confirmed}`);

        // Send confirmation email if user is unconfirmed
        if (!result.confirmed) {
            try {
                await strapi
                    .plugin('users-permissions')
                    .service('user')
                    .sendConfirmationEmail(result);
                strapi.log.info(`Confirmation email sent to ${result.email}`);
            } catch (error) {
                strapi.log.error(`Failed to send confirmation email to ${result.email}:`, error);
            }
        } else {
            strapi.log.info(`Skipping confirmation email for ${result.email} (already confirmed)`);
        }
    },
    
};