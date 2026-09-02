import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }> &
      Attribute.DefaultTo<'Passer123'>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    firstname: Attribute.String;
    lastname: Attribute.String;
    school: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::school.school'
    >;
    forcePasswordChange: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginEmailDesignerEmailTemplate
  extends Schema.CollectionType {
  collectionName: 'email_templates';
  info: {
    singularName: 'email-template';
    pluralName: 'email-templates';
    displayName: 'Email-template';
    name: 'email-template';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
    increments: true;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    templateReferenceId: Attribute.Integer & Attribute.Unique;
    design: Attribute.JSON;
    name: Attribute.String;
    subject: Attribute.String;
    bodyHtml: Attribute.Text;
    bodyText: Attribute.Text;
    enabled: Attribute.Boolean & Attribute.DefaultTo<true>;
    tags: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::email-designer.email-template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::email-designer.email-template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAcademicPeriodAcademicPeriod extends Schema.CollectionType {
  collectionName: 'academic_periods';
  info: {
    singularName: 'academic-period';
    pluralName: 'academic-periods';
    displayName: 'Academic Period';
    description: 'Academic period for grades, exams, and class councils';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<['trimester', 'semester', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'trimester'>;
    order: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    startDate: Attribute.Date;
    endDate: Attribute.Date;
    isActive: Attribute.Boolean & Attribute.DefaultTo<false>;
    school: Attribute.Relation<
      'api::academic-period.academic-period',
      'manyToOne',
      'api::school.school'
    >;
    schoolYear: Attribute.Relation<
      'api::academic-period.academic-period',
      'manyToOne',
      'api::school-year.school-year'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::academic-period.academic-period',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::academic-period.academic-period',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAssessmentAssessment extends Schema.CollectionType {
  collectionName: 'assessments';
  info: {
    singularName: 'assessment';
    pluralName: 'assessments';
    displayName: 'Assessment';
    description: 'Notes, homework, and exam assessment definitions';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    assessmentType: Attribute.Enumeration<['note', 'homework', 'exam']> &
      Attribute.Required;
    assessmentDate: Attribute.Date & Attribute.Required;
    dueDate: Attribute.Date;
    maxScore: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }> &
      Attribute.DefaultTo<20>;
    coefficient: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<1>;
    description: Attribute.Text;
    class: Attribute.Relation<
      'api::assessment.assessment',
      'manyToOne',
      'api::class.class'
    >;
    subject: Attribute.Relation<
      'api::assessment.assessment',
      'manyToOne',
      'api::subject.subject'
    >;
    teacher: Attribute.Relation<
      'api::assessment.assessment',
      'manyToOne',
      'api::teacher.teacher'
    >;
    academicPeriod: Attribute.Relation<
      'api::assessment.assessment',
      'manyToOne',
      'api::academic-period.academic-period'
    >;
    school: Attribute.Relation<
      'api::assessment.assessment',
      'manyToOne',
      'api::school.school'
    >;
    schoolYear: Attribute.Relation<
      'api::assessment.assessment',
      'manyToOne',
      'api::school-year.school-year'
    >;
    gradeEntries: Attribute.Relation<
      'api::assessment.assessment',
      'oneToMany',
      'api::grade-entry.grade-entry'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::assessment.assessment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::assessment.assessment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAttendanceRecordAttendanceRecord
  extends Schema.CollectionType {
  collectionName: 'attendance_records';
  info: {
    singularName: 'attendance-record';
    pluralName: 'attendance-records';
    displayName: 'Attendance Record';
    description: 'Student attendance and lateness tracking';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    attendanceDate: Attribute.Date & Attribute.Required;
    status: Attribute.Enumeration<['present', 'absent', 'excused', 'late']> &
      Attribute.Required;
    lateMinutes: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    reason: Attribute.Text;
    isJustified: Attribute.Boolean & Attribute.DefaultTo<false>;
    justificationNote: Attribute.Text;
    recordedAt: Attribute.DateTime;
    enrollment: Attribute.Relation<
      'api::attendance-record.attendance-record',
      'manyToOne',
      'api::enrollment.enrollment'
    >;
    courseSession: Attribute.Relation<
      'api::attendance-record.attendance-record',
      'manyToOne',
      'api::course-session.course-session'
    >;
    class: Attribute.Relation<
      'api::attendance-record.attendance-record',
      'manyToOne',
      'api::class.class'
    >;
    school: Attribute.Relation<
      'api::attendance-record.attendance-record',
      'manyToOne',
      'api::school.school'
    >;
    schoolYear: Attribute.Relation<
      'api::attendance-record.attendance-record',
      'manyToOne',
      'api::school-year.school-year'
    >;
    recordedBy: Attribute.Relation<
      'api::attendance-record.attendance-record',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::attendance-record.attendance-record',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::attendance-record.attendance-record',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClassClass extends Schema.CollectionType {
  collectionName: 'classes';
  info: {
    singularName: 'class';
    pluralName: 'classes';
    displayName: 'Classe';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    capacity: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    cycle: Attribute.Enumeration<
      ['primaire', 'secondaire 1er cycle', 'secondaire 2eme cycle']
    > &
      Attribute.Required;
    school: Attribute.Relation<
      'api::class.class',
      'manyToOne',
      'api::school.school'
    >;
    level: Attribute.Enumeration<
      [
        'CI',
        'CP',
        'CE1',
        'CE2',
        'CM1',
        'CM2',
        'a 6eme',
        'a 5eme',
        'a 4eme',
        'a 3eme',
        'a 2nd',
        'a 1ere',
        'Terminale'
      ]
    >;
    letter: Attribute.Enumeration<['A', 'B', 'C', 'D', 'E']>;
    schoolYear: Attribute.Relation<
      'api::class.class',
      'manyToOne',
      'api::school-year.school-year'
    >;
    enrollments: Attribute.Relation<
      'api::class.class',
      'oneToMany',
      'api::enrollment.enrollment'
    >;
    classSubjects: Attribute.Relation<
      'api::class.class',
      'oneToMany',
      'api::class-subject.class-subject'
    >;
    description: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::class.class',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::class.class',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClassCouncilClassCouncil extends Schema.CollectionType {
  collectionName: 'class_councils';
  info: {
    singularName: 'class-council';
    pluralName: 'class-councils';
    displayName: 'Class Council';
    description: 'Class council session for a class and academic period';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    councilDate: Attribute.Date & Attribute.Required;
    status: Attribute.Enumeration<['draft', 'validated', 'archived']> &
      Attribute.Required &
      Attribute.DefaultTo<'draft'>;
    generalNotes: Attribute.Text;
    class: Attribute.Relation<
      'api::class-council.class-council',
      'manyToOne',
      'api::class.class'
    >;
    academicPeriod: Attribute.Relation<
      'api::class-council.class-council',
      'manyToOne',
      'api::academic-period.academic-period'
    >;
    school: Attribute.Relation<
      'api::class-council.class-council',
      'manyToOne',
      'api::school.school'
    >;
    schoolYear: Attribute.Relation<
      'api::class-council.class-council',
      'manyToOne',
      'api::school-year.school-year'
    >;
    students: Attribute.Relation<
      'api::class-council.class-council',
      'oneToMany',
      'api::class-council-student.class-council-student'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::class-council.class-council',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::class-council.class-council',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClassCouncilStudentClassCouncilStudent
  extends Schema.CollectionType {
  collectionName: 'class_council_students';
  info: {
    singularName: 'class-council-student';
    pluralName: 'class-council-students';
    displayName: 'Class Council Student';
    description: 'Student summary and decision inside a class council';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    generalAverage: Attribute.Decimal;
    rank: Attribute.Integer;
    attendanceAbsences: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<0>;
    attendanceLates: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<0>;
    teacherComment: Attribute.Text;
    councilDecision: Attribute.Enumeration<
      [
        'pass',
        'repeat',
        'warning',
        'encouragement',
        'honor_roll',
        'excluded',
        'pending'
      ]
    > &
      Attribute.DefaultTo<'pending'>;
    decisionNote: Attribute.Text;
    council: Attribute.Relation<
      'api::class-council-student.class-council-student',
      'manyToOne',
      'api::class-council.class-council'
    >;
    enrollment: Attribute.Relation<
      'api::class-council-student.class-council-student',
      'manyToOne',
      'api::enrollment.enrollment'
    >;
    school: Attribute.Relation<
      'api::class-council-student.class-council-student',
      'manyToOne',
      'api::school.school'
    >;
    schoolYear: Attribute.Relation<
      'api::class-council-student.class-council-student',
      'manyToOne',
      'api::school-year.school-year'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::class-council-student.class-council-student',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::class-council-student.class-council-student',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClassSubjectClassSubject extends Schema.CollectionType {
  collectionName: 'class_subjects';
  info: {
    singularName: 'class-subject';
    pluralName: 'class-subjects';
    displayName: 'Class Subject';
    description: 'Coefficient of a subject for a specific class';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    class: Attribute.Relation<
      'api::class-subject.class-subject',
      'manyToOne',
      'api::class.class'
    >;
    subject: Attribute.Relation<
      'api::class-subject.class-subject',
      'manyToOne',
      'api::subject.subject'
    >;
    coefficient: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<1>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::class-subject.class-subject',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::class-subject.class-subject',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCourseSessionCourseSession extends Schema.CollectionType {
  collectionName: 'course_sessions';
  info: {
    singularName: 'course-session';
    pluralName: 'course-sessions';
    displayName: 'Course Session';
    description: 'Tracked delivered or planned course session';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    sessionDate: Attribute.Date & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    summary: Attribute.Text;
    homeworkGiven: Attribute.Text;
    status: Attribute.Enumeration<
      ['planned', 'done', 'cancelled', 'replaced']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'planned'>;
    cancelReason: Attribute.Text;
    replacementNote: Attribute.Text;
    completedAt: Attribute.DateTime;
    timetableSlot: Attribute.Relation<
      'api::course-session.course-session',
      'manyToOne',
      'api::timetable-slot.timetable-slot'
    >;
    class: Attribute.Relation<
      'api::course-session.course-session',
      'manyToOne',
      'api::class.class'
    >;
    teacher: Attribute.Relation<
      'api::course-session.course-session',
      'manyToOne',
      'api::teacher.teacher'
    >;
    subject: Attribute.Relation<
      'api::course-session.course-session',
      'manyToOne',
      'api::subject.subject'
    >;
    school: Attribute.Relation<
      'api::course-session.course-session',
      'manyToOne',
      'api::school.school'
    >;
    schoolYear: Attribute.Relation<
      'api::course-session.course-session',
      'manyToOne',
      'api::school-year.school-year'
    >;
    attendanceRecords: Attribute.Relation<
      'api::course-session.course-session',
      'oneToMany',
      'api::attendance-record.attendance-record'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::course-session.course-session',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::course-session.course-session',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEnrollmentEnrollment extends Schema.CollectionType {
  collectionName: 'enrollments';
  info: {
    singularName: 'enrollment';
    pluralName: 'enrollments';
    displayName: 'Enrollment';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    enrollmentDate: Attribute.Date & Attribute.Required;
    class: Attribute.Relation<
      'api::enrollment.enrollment',
      'manyToOne',
      'api::class.class'
    >;
    student: Attribute.Relation<
      'api::enrollment.enrollment',
      'manyToOne',
      'api::student.student'
    >;
    schoolYear: Attribute.Relation<
      'api::enrollment.enrollment',
      'manyToOne',
      'api::school-year.school-year'
    >;
    enrollmentNumber: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 1;
      }> &
      Attribute.DefaultTo<1>;
    payments: Attribute.Relation<
      'api::enrollment.enrollment',
      'oneToMany',
      'api::payment.payment'
    >;
    enrollmentType: Attribute.Enumeration<
      ['Ancien Redoublant', 'Ancien Passant', 'Nouveau']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Nouveau'>;
    socialStatus: Attribute.Enumeration<
      [
        'Non',
        'R\u00E9duction inscription',
        'R\u00E9duction mensualit\u00E9',
        'Tout tarifs offerts'
      ]
    > &
      Attribute.DefaultTo<'Non'>;
    isConfirmed: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::enrollment.enrollment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::enrollment.enrollment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiExpenseExpense extends Schema.CollectionType {
  collectionName: 'expenses';
  info: {
    singularName: 'expense';
    pluralName: 'expenses';
    displayName: 'Expense';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    expenseDate: Attribute.Date;
    amount: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    category: Attribute.Enumeration<
      [
        'Services Publics',
        'Salaires',
        'Fournitures',
        'Entretien',
        'Transport',
        'Activit\u00E9s Parascolaires',
        '\u00C9quipements',
        'Formation',
        'Autres'
      ]
    > &
      Attribute.Required;
    description: Attribute.String;
    school: Attribute.Relation<
      'api::expense.expense',
      'manyToOne',
      'api::school.school'
    >;
    schoolYear: Attribute.Relation<
      'api::expense.expense',
      'manyToOne',
      'api::school-year.school-year'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::expense.expense',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::expense.expense',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGradeEntryGradeEntry extends Schema.CollectionType {
  collectionName: 'grade_entries';
  info: {
    singularName: 'grade-entry';
    pluralName: 'grade-entries';
    displayName: 'Grade Entry';
    description: 'Student score for one assessment';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    score: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    isAbsent: Attribute.Boolean & Attribute.DefaultTo<false>;
    comment: Attribute.Text;
    assessment: Attribute.Relation<
      'api::grade-entry.grade-entry',
      'manyToOne',
      'api::assessment.assessment'
    >;
    enrollment: Attribute.Relation<
      'api::grade-entry.grade-entry',
      'manyToOne',
      'api::enrollment.enrollment'
    >;
    school: Attribute.Relation<
      'api::grade-entry.grade-entry',
      'manyToOne',
      'api::school.school'
    >;
    schoolYear: Attribute.Relation<
      'api::grade-entry.grade-entry',
      'manyToOne',
      'api::school-year.school-year'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::grade-entry.grade-entry',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::grade-entry.grade-entry',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPaymentPayment extends Schema.CollectionType {
  collectionName: 'payments';
  info: {
    singularName: 'payment';
    pluralName: 'payments';
    displayName: 'Payment';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    reference: Attribute.String & Attribute.Unique;
    monthOf: Attribute.Date;
    isPaid: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    enrollment: Attribute.Relation<
      'api::payment.payment',
      'manyToOne',
      'api::enrollment.enrollment'
    >;
    amount: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    paymentType: Attribute.Enumeration<
      ['enrollment', 'monthly', 'exam', 'blouse', 'parentContribution', 'other']
    > &
      Attribute.Required;
    motive: Attribute.String;
    comment: Attribute.Text;
    status: Attribute.Enumeration<['pending', 'paid', 'cancelled']> &
      Attribute.Required &
      Attribute.DefaultTo<'paid'>;
    cancellationReason: Attribute.Text;
    cancelledAt: Attribute.Date;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSchoolSchool extends Schema.CollectionType {
  collectionName: 'schools';
  info: {
    singularName: 'school';
    pluralName: 'schools';
    displayName: 'School';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    parentSchool: Attribute.Relation<
      'api::school.school',
      'manyToOne',
      'api::school.school'
    >;
    childSchools: Attribute.Relation<
      'api::school.school',
      'oneToMany',
      'api::school.school'
    >;
    type: Attribute.Enumeration<['Centre', 'Centre Secondaire', 'Annexe']> &
      Attribute.Required;
    region: Attribute.Enumeration<
      [
        'Dakar',
        'Diourbel',
        'Fatick',
        'Kaffrine',
        'Kaolack',
        'K\u00E9dougou',
        'Kolda',
        'Louga',
        'Matam',
        'Saint-Louis',
        'S\u00E9dhiou',
        'Tambacounda',
        'Thi\u00E8s',
        'Ziguinchor'
      ]
    > &
      Attribute.Required;
    department: Attribute.Enumeration<
      [
        'Bakel',
        'Bambey',
        'Bignona',
        'Birkelane',
        'Bounkiling',
        'Dagana',
        'Dakar',
        'Diourbel',
        'Fatick',
        'Foundiougne',
        'Gossas',
        'Goudiry',
        'Goudomp',
        'Gu\u00E9diawaye',
        'Guinguin\u00E9o',
        'Kafrine',
        'Kaolack',
        'Kanel',
        'K\u00E9b\u00E9mer',
        'K\u00E9dougou',
        'Keur Massar',
        'Kolda',
        'Koumpentoum',
        'Koungheul',
        'Lingu\u00E8re',
        'Louga',
        "M'bour",
        'Malem Hodar',
        'Matam',
        'Mback\u00E9',
        'M\u00E9dina Yoro Foulah',
        'Nioro du Rip',
        'Oussouye',
        'Pikine',
        'Podor',
        'Ran\u00E9rou',
        'Rufisque',
        'Saint-Louis',
        'Salemata',
        'Saraya',
        'S\u00E9dhiou',
        'Tambacounda',
        'Thi\u00E8s',
        'Tivaouane',
        'V\u00E9lingara',
        'Ziguinchor'
      ]
    >;
    commune: Attribute.String;
    creationDate: Attribute.Date;
    address: Attribute.String;
    email: Attribute.Email;
    phone: Attribute.String;
    phoneFix: Attribute.String;
    isAlAzharLand: Attribute.Boolean;
    note: Attribute.Text;
    IA: Attribute.String;
    IEF: Attribute.String;
    responsibleName: Attribute.String;
    city: Attribute.String;
    postBox: Attribute.String;
    classes: Attribute.Relation<
      'api::school.school',
      'oneToMany',
      'api::class.class'
    >;
    subjects: Attribute.Relation<
      'api::school.school',
      'oneToMany',
      'api::subject.subject'
    >;
    banner: Attribute.Media;
    expenses: Attribute.Relation<
      'api::school.school',
      'oneToMany',
      'api::expense.expense'
    >;
    periodTemplate: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::school.school',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::school.school',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSchoolYearSchoolYear extends Schema.CollectionType {
  collectionName: 'school_years';
  info: {
    singularName: 'school-year';
    pluralName: 'school-years';
    displayName: 'SchoolYear';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    startDate: Attribute.Date & Attribute.Required;
    endDate: Attribute.Date & Attribute.Required;
    isCurrent: Attribute.Boolean &
      Attribute.Unique &
      Attribute.DefaultTo<false>;
    isEnded: Attribute.Boolean & Attribute.DefaultTo<false>;
    description: Attribute.String;
    classes: Attribute.Relation<
      'api::school-year.school-year',
      'oneToMany',
      'api::class.class'
    >;
    enrollments: Attribute.Relation<
      'api::school-year.school-year',
      'oneToMany',
      'api::enrollment.enrollment'
    >;
    expenses: Attribute.Relation<
      'api::school-year.school-year',
      'oneToMany',
      'api::expense.expense'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::school-year.school-year',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::school-year.school-year',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStudentStudent extends Schema.CollectionType {
  collectionName: 'students';
  info: {
    singularName: 'student';
    pluralName: 'students';
    displayName: 'Student';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    firstname: Attribute.String & Attribute.Required;
    lastname: Attribute.String & Attribute.Required;
    gender: Attribute.Enumeration<['Homme', 'Femme']> & Attribute.Required;
    dateOfBirth: Attribute.Date & Attribute.Required;
    birthPlace: Attribute.String & Attribute.Required;
    tutorFirstname: Attribute.String & Attribute.Required;
    tutorLastname: Attribute.String & Attribute.Required;
    tutorPhoneNumber: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<
      ['Ancien Redoublant', 'Ancien Passant', 'Nouveau']
    > &
      Attribute.DefaultTo<'Nouveau'>;
    socialStatus: Attribute.Enumeration<
      [
        'Non',
        'R\u00E9duction inscription',
        'R\u00E9duction mensualit\u00E9',
        'Tout tarifs offerts'
      ]
    > &
      Attribute.DefaultTo<'Non'>;
    registrationComment: Attribute.String;
    enrollments: Attribute.Relation<
      'api::student.student',
      'oneToMany',
      'api::enrollment.enrollment'
    >;
    studentIdentifer: Attribute.String &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::student.student',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::student.student',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubjectSubject extends Schema.CollectionType {
  collectionName: 'subjects';
  info: {
    singularName: 'subject';
    pluralName: 'subjects';
    displayName: 'Subject';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subjectname: Attribute.String & Attribute.Required;
    school: Attribute.Relation<
      'api::subject.subject',
      'manyToOne',
      'api::school.school'
    >;
    classSubjects: Attribute.Relation<
      'api::subject.subject',
      'oneToMany',
      'api::class-subject.class-subject'
    >;
    code: Attribute.String;
    isActive: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::subject.subject',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::subject.subject',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTeacherTeacher extends Schema.CollectionType {
  collectionName: 'teachers';
  info: {
    singularName: 'teacher';
    pluralName: 'teachers';
    displayName: 'Teacher';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    firstname: Attribute.String & Attribute.Required;
    lastname: Attribute.String & Attribute.Required;
    phoneNumber: Attribute.String & Attribute.Required;
    email: Attribute.Email;
    gender: Attribute.Enumeration<['Homme', 'Femme']>;
    school: Attribute.Relation<
      'api::teacher.teacher',
      'oneToOne',
      'api::school.school'
    >;
    birthDate: Attribute.Date;
    birthPlace: Attribute.String;
    address: Attribute.String;
    maritalStatus: Attribute.Enumeration<
      ['Mari\u00E9(e)', 'C\u00E9libataire', 'Divorc\u00E9(e)']
    >;
    academicDegree: Attribute.Enumeration<
      ['Baccalaur\u00E9at', 'Licence', 'Master', 'Doctorat']
    >;
    language: Attribute.Enumeration<['Francais', 'Anglais', 'Arabe', 'Wolof']>;
    contractType: Attribute.Enumeration<
      ['Disponible', 'Employ\u00E9 Etat', 'Journalier', 'Etranger']
    > &
      Attribute.DefaultTo<'Disponible'>;
    level: Attribute.Enumeration<['Primaire', 'Moyen', 'Secondaire']>;
    salary: Attribute.Decimal;
    registrationNumber: Attribute.String;
    generation: Attribute.String;
    salaryPerHour: Attribute.Decimal;
    hoursNumber: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    additionalResponsibilities: Attribute.String;
    countryFrom: Attribute.String;
    arrivalDate: Attribute.Date;
    previousInstitutes: Attribute.String;
    contributions: Attribute.String;
    professionalDegrees: Attribute.JSON & Attribute.DefaultTo<[]>;
    disciplines: Attribute.JSON & Attribute.DefaultTo<[]>;
    subjects: Attribute.JSON & Attribute.DefaultTo<[]>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::teacher.teacher',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::teacher.teacher',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTimetableSlotTimetableSlot extends Schema.CollectionType {
  collectionName: 'timetable_slots';
  info: {
    singularName: 'timetable-slot';
    pluralName: 'timetable-slots';
    displayName: 'Timetable Slot';
    description: 'Weekly class schedule slot';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    dayOfWeek: Attribute.Enumeration<
      [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
      ]
    > &
      Attribute.Required;
    startTime: Attribute.Time & Attribute.Required;
    endTime: Attribute.Time & Attribute.Required;
    room: Attribute.String;
    status: Attribute.Enumeration<['active', 'inactive']> &
      Attribute.Required &
      Attribute.DefaultTo<'active'>;
    notes: Attribute.Text;
    class: Attribute.Relation<
      'api::timetable-slot.timetable-slot',
      'manyToOne',
      'api::class.class'
    >;
    teacher: Attribute.Relation<
      'api::timetable-slot.timetable-slot',
      'manyToOne',
      'api::teacher.teacher'
    >;
    subject: Attribute.Relation<
      'api::timetable-slot.timetable-slot',
      'manyToOne',
      'api::subject.subject'
    >;
    school: Attribute.Relation<
      'api::timetable-slot.timetable-slot',
      'manyToOne',
      'api::school.school'
    >;
    schoolYear: Attribute.Relation<
      'api::timetable-slot.timetable-slot',
      'manyToOne',
      'api::school-year.school-year'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::timetable-slot.timetable-slot',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::timetable-slot.timetable-slot',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::email-designer.email-template': PluginEmailDesignerEmailTemplate;
      'api::academic-period.academic-period': ApiAcademicPeriodAcademicPeriod;
      'api::assessment.assessment': ApiAssessmentAssessment;
      'api::attendance-record.attendance-record': ApiAttendanceRecordAttendanceRecord;
      'api::class.class': ApiClassClass;
      'api::class-council.class-council': ApiClassCouncilClassCouncil;
      'api::class-council-student.class-council-student': ApiClassCouncilStudentClassCouncilStudent;
      'api::class-subject.class-subject': ApiClassSubjectClassSubject;
      'api::course-session.course-session': ApiCourseSessionCourseSession;
      'api::enrollment.enrollment': ApiEnrollmentEnrollment;
      'api::expense.expense': ApiExpenseExpense;
      'api::grade-entry.grade-entry': ApiGradeEntryGradeEntry;
      'api::payment.payment': ApiPaymentPayment;
      'api::school.school': ApiSchoolSchool;
      'api::school-year.school-year': ApiSchoolYearSchoolYear;
      'api::student.student': ApiStudentStudent;
      'api::subject.subject': ApiSubjectSubject;
      'api::teacher.teacher': ApiTeacherTeacher;
      'api::timetable-slot.timetable-slot': ApiTimetableSlotTimetableSlot;
    }
  }
}
