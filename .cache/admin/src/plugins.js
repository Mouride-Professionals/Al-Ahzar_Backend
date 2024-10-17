
import contentTypeBuilder from '@strapi/plugin-content-type-builder/strapi-admin';
import email from '@strapi/plugin-email/strapi-admin';
import upload from '@strapi/plugin-upload/strapi-admin';
import ckeditor5 from '@_sh/strapi-plugin-ckeditor/strapi-admin';
import documentation from '@strapi/plugin-documentation/strapi-admin';
import i18N from '@strapi/plugin-i18n/strapi-admin';
import usersPermissions from '@strapi/plugin-users-permissions/strapi-admin';
import configSync from 'strapi-plugin-config-sync/strapi-admin';
import countrySelect from 'strapi-plugin-country-select/strapi-admin';
import emailDesigner from 'strapi-plugin-email-designer/strapi-admin';
import importExportEntries from 'strapi-plugin-import-export-entries/strapi-admin';


const plugins = {
  'content-type-builder': contentTypeBuilder,
  'email': email,
  'upload': upload,
  'ckeditor5': ckeditor5,
  'documentation': documentation,
  'i18n': i18N,
  'users-permissions': usersPermissions,
  'config-sync': configSync,
  'country-select': countrySelect,
  'email-designer': emailDesigner,
  'import-export-entries': importExportEntries,
};

export default plugins;
