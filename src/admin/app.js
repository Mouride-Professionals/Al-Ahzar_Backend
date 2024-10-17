import {
  default as AuthLogo,
  default as MenuLogo,
} from "./extensions/logo/base.png";

const config = {
  // Replace the Strapi logo in auth (login) views
  auth: {
    logo: AuthLogo,
  },
  // Replace the favicon
  // head: {
  //   favicon: favicon,
  // },
  // Replace the Strapi logo in the main navigation
  menu: {
    logo: MenuLogo,
  },
  locales: [
    'ar',
    'fr',
    // 'cs',
    // 'de',
    // 'dk',
    // 'es',
    // 'he',
    // 'id',
    // 'it',
    // 'ja',
    // 'ko',
    // 'ms',
    // 'nl',
    // 'no',
    // 'pl',
    // 'pt-BR',
    // 'pt',
    // 'ru',
    // 'sk',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'vi',
    // 'zh-Hans',
    // 'zh',
  ],
  translations: {
    en: {
      "Auth.form.welcome.title": "Espace Admin Al Azhar",
      "Auth.form.welcome.subtitle": "Connectez-vous à votre compte",
      "app.components.LeftMenu.navbrand.title": "Back Office",
      "app.components.LeftMenu.navbrand.workplace": "Al Azhar",
    },
  },
  theme: {
    colors: {
      // alternative100: '#181826',
      // alternative200: '#4a4a6a',
      alternative500: '#ffaf66',
      alternative600: '#ffaf66',
      // alternative700: '#e0c1f4',
      // buttonNeutral0: '#ffffff',
      buttonPrimary500: 'rgba(100, 165, 123, 0.2)',
      buttonPrimary600: '#334a34',
      // danger100: '#181826',
      // danger200: '#4a4a6a',
      // danger500: '#ee5e52',
      // danger600: '#ee5e52',
      // danger700: '#ee5e52',
      // neutral0: '#212134',
      // neutral100: '#181826',
      // neutral1000: '#ffffff',
      // neutral150: '#32324d',
      // neutral200: '#4a4a6a',
      // neutral300: '#666687',
      // neutral400: '#a5a5ba',
      // neutral500: '#c0c0cf',
      // neutral600: '#a5a5ba',
      // neutral700: '#eaeaef',
      // neutral800: '#ffffff',
      // neutral900: '#ffffff',
      // primary100: '#181826',
      // primary200: '#4a4a6a',
      primary500: 'rgba(100, 165, 123, 0.2)',
      primary600: '#334a34',
      primary700: '#334a34',
      // secondary100: '#181826',
      // secondary200: '#4a4a6a',
      // secondary500: '#66b7f1',
      // secondary600: '#66b7f1',
      // secondary700: '#b8e1ff',
      // success100: '#181826',
      // success200: '#4a4a6a',
      // success500: '#5cb176',
      // success600: '#5cb176',
      // success700: '#c6f0c2',
      // warning100: '#181826',
      // warning200: '#4a4a6a',
      // warning500: '#f29d41',
      // warning600: '#f29d41',
      // warning700: '#fae7b9',
    }
  }
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
