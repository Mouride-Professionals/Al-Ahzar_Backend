module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      register: {
        allowedFields: ['firstname', 'lastname', 'school'],
      },
      resetPassword: {
        from: env('EMAIL_FROM', 'toubadarou399@gmail.com'),
        replyTo: env('EMAIL_REPLY_TO', 'toubadarou399@gmail.com'),
        emailTemplate: {
          subject: 'Al Azhar - Réinitialisation de Mot de Passe',
          text: `Bonjour, nous avons reçu une demande pour réinitialiser le mot de passe de votre compte Al Azhar. Visitez: <%= url %>`,
          html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Réinitialisation de Mot de Passe - Al Azhar</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #fd6101; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Al Azhar - Réinitialisation de Mot de Passe</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.5;">
              <p style="margin: 0 0 20px;">Bonjour,</p>
              <p style="margin: 0 0 20px;">Nous avons reçu une demande pour réinitialiser le mot de passe de votre compte Al Azhar. Pas d'inquiétude, vous pouvez facilement définir un nouveau mot de passe en cliquant sur le bouton ci-dessous :</p>
              <p style="text-align: center; margin: 20px 0;">
                <a href="<%= url %>" style="display: inline-block; background-color: #fd6101; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Réinitialiser mon mot de passe</a>
              </p>
              <p style="margin: 0 0 20px;">Ce lien est valable pendant 24 heures. Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail ou contacter notre support.</p>
              <p style="margin: 0;">Merci de faire partie de l'institut Al Azhar !</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f8f8; padding: 20px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; color: #666666; font-size: 14px;">
              <p style="margin: 0 0 10px;">Besoin d'aide ? Contactez l'équipe de support à <a href="mailto:support@al-azhar.com" style="color: #fd6101;">support@al-azhar.com</a>.</p>
              <p style="margin: 0;">Mourid Professional ©️ 2025</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
        },
      },
      emailConfirmation: {
        from: env('EMAIL_FROM', 'toubadarou399@gmail.com'),
        replyTo: env('EMAIL_REPLY_TO', 'toubadarou399@gmail.com'),
        redirectUrl: env('PUBLIC_URL', 'https://al-ahzar-backend-xeuc.onrender.com') + 'user/auth/email-confirmed',
        emailTemplate: {
          subject: 'Al Azhar - Confirmation d\'Inscription',
          text: `Merci de vous être inscrit au système de gestion Al Azhar ! Pour activer votre compte, veuillez confirmer votre adresse e-mail en visitant: <%= url %>`,
          html: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation d'Inscription - Al Azhar</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #fd6101; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Bienvenue à Al Azhar</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.5;">
              <p style="margin: 0 0 20px;">Merci de vous être inscrit au système de gestion Al Azhar !</p>
              <p style="margin: 0 0 20px;">Pour activer votre compte, veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous :</p>
              <p style="text-align: center; margin: 20px 0;">
                <a href="<%= url %>" style="display: inline-block; background-color: #fd6101; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Confirmer mon e-mail</a>
              </p>
              <p style="margin: 0 0 20px;">Votre mot de passe temporaire est : <strong>Passer@123</strong></p>
              <p style="margin: 0 0 20px;">Pour des raisons de sécurité, vous devez changer ce mot de passe lors de votre première connexion. Connectez-vous à <a href="https://al-ahzar-front.vercel.app" style="color: #fd6101;">Al Azhar</a> et suivez les instructions pour mettre à jour votre mot de passe.</p>
              <p style="margin: 0;">Merci de faire partie de l'institut Al Azhar !</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f8f8; padding: 20px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; color: #666666; font-size: 14px;">
              <p style="margin: 0 0 10px;">Besoin d'aide ? Contactez l'équipe de support à <a href="mailto:support@al-azhar.com" style="color: #fd6101;">support@al-azhar.com</a>.</p>
              <p style="margin: 0;">Mourid Professional &copy; 2025</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
        },
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('EMAIL_FROM', 'toubadarou399@gmail.com'),
        defaultReplyTo: env('EMAIL_REPLY_TO', 'toubadarou399@gmail.com'),
        defaultFooter: 'Al Azhar, Ndame, Touba, Senegal',
      },
    },
  },


});
