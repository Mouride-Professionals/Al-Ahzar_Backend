module.exports = ({ env }) => ({
    'users-permissions': {
        config: {
            // register: {
            //     allowedFields: ['firstname', 'lastname', 'school'],
            // },
            resetPassword: {
                from: env('EMAIL_FROM', 'no-reply@al-azhar.com'),
                replyTo: env('EMAIL_REPLY_TO', 'support@al-azhar.com'),
                emailTemplate: {
                    subject: 'Al Azhar Password Reset',
                    text: `Your password reset code is: <%= code %>. Use it at <%= url %>`,
                    html: `<p>Your password reset code is: <strong><%= code %></strong>.</p><p>Use it at <a href="<%= url %>"><%= url %></a></p>`,
                },
            },
        },
    },
    email: {
        config: {
            provider: 'sendgrid',
            providerOptions: {
                apiKey: env('SENDGRID_API_KEY'),
            },
            settings: {
                defaultFrom: 'toubadarou399@gmail.com',
                defaultReplyTo: 'toubadarou399@gmail.com',
                defaultFooter: 'Al Azhar, 123 Main St, Dakar, Senegal',
            },
        },
    },


});