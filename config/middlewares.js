module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://al-ahzar-backend.onrender.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'https://al-ahzar-backend.onrender.com'],
          'script-src': ["'self'", 'https://al-ahzar-backend.onrender.com'],
          'script-src-elem': ["'self'", 'https://al-ahzar-backend.onrender.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://al-ahzar-front.vercel.app', 'http://localhost:3000', 'https://al-ahzar-backend.onrender.com'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
