module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://api.alazharsn.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'https://api.alazharsn.com'],
          'script-src': ["'self'", 'https://api.alazharsn.com'],
          'script-src-elem': ["'self'", 'https://api.alazharsn.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://api.alazharsn.com', 'https://app.alazharsn.com', 'https://al-ahzar-front.vercel.app', 'http://localhost:3000', 'http://localhost:1338'],
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
