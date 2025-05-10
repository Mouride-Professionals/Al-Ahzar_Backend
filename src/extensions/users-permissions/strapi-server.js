module.exports = (plugin) => {
    plugin.services.user.sendConfirmationEmail = async (user) => {
        const confirmationToken = require('crypto').randomBytes(20).toString('hex');
        await strapi.entityService.update(
            'plugin::users-permissions.user',
            user.id,
            {
                data: {
                    confirmationToken,
                },
            }
        );

        const emailTemplate = {
            subject: 'Welcome to Al Azhar - Confirm Your Email',
            text: `Please confirm your email by clicking this link: <%= URL %>?confirmation=<%= CODE %>\n\nAl Azhar\n123 Main St, Dakar, Senegal`,
            html: `<h1>Welcome to Al Azhar</h1><p>Please confirm your email by clicking <a href="<%= URL %>?confirmation=<%= CODE %>">here</a>.</p><p>Al Azhar<br>123 Main St, Dakar, Senegal</p>`,
        };

        await strapi.plugins['email'].services.email.sendTemplatedEmail(
            {
                to: user.email,
                from: 'toubadarou399@gmail.com',
            },
            emailTemplate,
            {
                user,
                URL: 'https://al-ahzar-front.vercel.app/user/confirmation/submit',
                CODE: confirmationToken,
            }
        );
    };

    plugin.controllers.auth.changePassword = async (ctx) => {
        const { currentPassword, newPassword, confirmNewPassword } = ctx.request.body;
        const user = ctx.state.user;

        if (!user) {
            return ctx.badRequest('No authorized user found');
        }

        if (newPassword !== confirmNewPassword) {
            return ctx.badRequest('New passwords do not match');
        }

        const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(
            currentPassword,
            user.password
        );

        if (!validPassword) {
            return ctx.badRequest('Current password is incorrect');
        }

        await strapi.entityService.update(
            'plugin::users-permissions.user',
            user.id,
            {
                data: {
                    password: newPassword,
                    forcePasswordChange: false,
                },
            }
        );

        return ctx.send({ message: 'Password changed successfully' });
    };

    plugin.routes['content-api'].routes.push({
        method: 'POST',
        path: '/auth/change-password',
        handler: 'auth.changePassword',
        config: {
            auth: {
                scope: ['user'],
            },
        },
    });

    const originalLogin = plugin.controllers.auth.callback;
    plugin.controllers.auth.callback = async (ctx) => {
        const response = await originalLogin(ctx);
        if (response && response.user && response.user.forcePasswordChange) {
            return ctx.send({
                jwt: response.jwt,
                user: response.user,
                forcePasswordChange: true,
            });
        }
        return response;
    };

    return plugin;
};