# Al-Azhar RBAC - Adjoint Roles Implementation

## Overview

This document describes the implementation of "Adjoint" (Assistant) roles for the Al-Azhar school management system. Each adjoint role has identical permissions to its corresponding main role.

## Implemented Adjoint Roles

### 1. **Adjoint Caissier** (`adjoint_caissier`)

- **Main Role**: Caissier
- **Description**: Assistant au Caissier - Même permissions que le Caissier titulaire
- **Key Permissions**:
  - Payment management (create, find, update, stats)
  - Expense management (create, find, update, stats)
  - Student management (find, update)
  - Enrollment management (find, update)
  - Basic authentication and user management

### 2. **Adjoint Surveillant General** (`adjoint_surveillant_general`)

- **Main Role**: Surveillant General
- **Description**: Assistant au Surveillant General - Même permissions que le Surveillant General titulaire
- **Key Permissions**:
  - Student management (create, delete, find, update)
  - Student bulk import (bulkImport, downloadTemplate, validateBulkImport, getImportStats)
  - Enrollment management (create, find, update)
  - Basic data access (classes, schools, school-years, teachers)
  - Limited user management

### 3. **Adjoint Secretaire General** (`adjoint_secretaire_general`)

- **Main Role**: Secretaire General
- **Description**: Assistant au Secretaire General - Même permissions que le Secretaire General titulaire
- **Key Permissions**:
  - Full class management (create, delete, find, update)
  - Full school management (create, find, update)
  - Full school-year management (create, delete, find, update, setCurrent, setEnded)
  - Full student and teacher management
  - Advanced user and role management
  - Authentication management (register, emailConfirmation, etc.)

### 4. **Adjoint Directeur General** (`adjoint_directeur_general`)

- **Main Role**: Directeur General
- **Description**: Assistant au Directeur General - Même permissions que le Directeur General titulaire
- **Key Permissions**:
  - **Complete system access** including:
  - Full CRUD on all entities (class, enrollment, school, student, subject, teacher)
  - Advanced school-year management
  - File upload and email capabilities
  - Import/Export functionality
  - Complete user management including user deletion (destroy)
  - Full authentication and permissions management

### 5. **Adjoint Directeur Etablissement** (`adjoint_directeur_etablissment`)

- **Main Role**: Directeur Etablissement
- **Description**: Assistant au Directeur Etablissement - Même permissions que le Directeur Etablissement titulaire
- **Key Permissions**:
  - School and class management (create, delete, find, update)
  - Student and teacher management (create, delete, find, update)
  - Financial data access (expenses, payments - read only)
  - User creation and management
  - Basic authentication functions

## Role Hierarchy (by Permission Level)

1. **Directeur General / Adjoint Directeur General** - Full system access
2. **Secretaire General / Adjoint Secretaire General** - Administrative management
3. **Directeur Etablissement / Adjoint Directeur Etablissement** - School-level management
4. **Surveillant General / Adjoint Surveillant General** - Student-focused management
5. **Caissier / Adjoint Caissier** - Financial operations

## Implementation Details

### File Structure

All adjoint roles are implemented as separate JSON configuration files in:

```
config/sync/user-role.adjoint_[role_name].json
```

### Naming Convention

- **File naming**: `user-role.adjoint_[main_role_name].json`
- **Role type**: `adjoint_[main_role_name]`
- **Display name**: `Adjoint [Main Role Name]`

### Permission Inheritance

Each adjoint role contains an exact copy of its main role's permissions array, ensuring complete functional equivalence.

## Usage

### Assigning Adjoint Roles

1. Navigate to Strapi Admin Panel
2. Go to Settings > Users & Permissions Plugin > Roles
3. Select the appropriate adjoint role
4. Assign to users who need assistant-level access

### Benefits

- **Continuity**: Operations can continue when main role holders are absent
- **Load Distribution**: Work can be shared between main and adjoint role holders
- **Training**: New staff can be assigned adjoint roles for training purposes
- **Flexibility**: Multiple people can have the same level of access when needed

## Security Considerations

1. **Identical Permissions**: Adjoint roles have the same security level as their main counterparts
2. **Audit Trail**: Both main and adjoint role actions are logged identically
3. **Access Control**: Standard Strapi authentication applies to all roles
4. **Role Separation**: Clear distinction between main and adjoint roles for reporting purposes

## Maintenance

When updating permissions for main roles, remember to:

1. Update the corresponding adjoint role with identical permissions
2. Test both roles to ensure functionality is preserved
3. Update this documentation if role structures change

---

**Created**: September 14, 2025  
**System**: Al-Azhar School Management - Strapi Backend  
**Total Adjoint Roles**: 5  
**Status**: Production Ready
