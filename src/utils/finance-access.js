"use strict";

const GLOBAL_FINANCE_ROLES = new Set([
  "secretaire_general",
  "adjoint_secretaire_general",
  "directeur_general",
  "adjoint_directeur_general",
  "sgf",
  "adjoint_sgf",
  "secretaire_generale_finances",
  "adjoint_secretaire_generale_finances",
]);

const SCHOOL_SCOPED_FINANCE_ROLES = new Set([
  "caissier",
  "adjoint_caissier",
  "directeur_etablissment",
  "adjoint_directeur_etablissment",
  "directeur_etablissement",
  "adjoint_directeur_etablissement",
]);

async function resolveFinanceAccessContext(strapi, authUserId) {
  if (!authUserId) {
    return null;
  }

  const user = await strapi.entityService.findOne(
    "plugin::users-permissions.user",
    authUserId,
    {
      populate: {
        role: true,
        school: true,
      },
    }
  );

  if (!user?.role?.type) {
    return null;
  }

  const roleType = user.role.type;
  const schoolId = user.school?.id ? String(user.school.id) : null;

  if (GLOBAL_FINANCE_ROLES.has(roleType)) {
    return {
      roleType,
      scope: "global",
      schoolId,
    };
  }

  if (SCHOOL_SCOPED_FINANCE_ROLES.has(roleType) && schoolId) {
    return {
      roleType,
      scope: "school",
      schoolId,
    };
  }

  return null;
}

module.exports = {
  resolveFinanceAccessContext,
};
