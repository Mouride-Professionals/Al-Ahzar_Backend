# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
yarn develop          # Start dev server with hot reload (port 1338)
yarn build            # Build admin panel for production
yarn start            # Start production server (port 1337)
yarn cs import        # Import config-sync JSON files to database
yarn cs export        # Export database configs to JSON files
```

Docker deployment:
```bash
docker compose -f docker/docker-compose.yml up -d   # Full stack: Caddy + Strapi + PostgreSQL
```

No test or lint commands are configured.

## Architecture

**Strapi v4.14.5** headless CMS for managing an Islamic school system (Al-Azhar, Touba, Senegal). Node.js >=16 <=20. Uses yarn.

### Content Types (src/api/)

| Collection | Key Purpose |
|---|---|
| **school** | Hierarchical school structure (Centre → Centre Secondaire → Annexe), self-referencing parentSchool/childSchools |
| **school-year** | Academic year with `isCurrent` (unique, only one active) and `isEnded` flags |
| **class** | Classified by cycle (primaire/secondaire), level (CI through Terminale), and letter (A-E); tied to school + schoolYear |
| **student** | Auto-generated unique identifier (format: `AZ[YY][6-chars]`), tutor info, social status |
| **enrollment** | Links student → class → schoolYear; auto-incremented enrollmentNumber per class |
| **payment** | Tracks enrollment/monthly/exam/blouse fees; status: pending/paid/cancelled |
| **expense** | School expenses by category (Salaires, Fournitures, etc.) tied to school + schoolYear |
| **teacher** | Personnel records with contract type, salary, academic degree |
| **subject** | Course definitions with hourly rates |

### Domain Model Relationships

```
School (hierarchical via parentSchool)
  ├── Classes (scoped to SchoolYear)
  │     └── Enrollments
  │           ├── Student
  │           └── Payments
  └── Expenses (scoped to SchoolYear)
```

### Custom Endpoints Beyond CRUD

- `GET /payments/stats` — Financial aggregation (year totals, monthly breakdown, by payment type/status). Uses Knex queries directly. See `src/api/payment/controllers/payment.js`.
- `GET /expenses/stats` — Expense aggregation by month and category. See `src/api/expense/controllers/expense.js`.
- `PUT /school-years/:id/set-current` and `set-ended` — State transitions with validation. See `src/api/school-year/controllers/school-year.js`.
- `GET /students/bulk/template` — Download Excel import template.
- `POST /students/bulk/validate` — Validate Excel/CSV before import.
- `POST /students/bulk/import` — Bulk create students from Excel/CSV (10MB limit). See `src/api/student/services/bulk-import.js`.

### Key Custom Logic

- **Student identifier generation** (`src/api/student/utils/identifier.js`): Format `AZ[YY][6-random-chars]` using unambiguous charset. Retry on collision via `src/api/student/services/creator.js`.
- **SchoolYear lifecycle hooks** (`src/api/school-year/content-types/school-year/lifecycles.js`): Enforces single current year, prevents current if ended.
- **Enrollment auto-numbering** (`src/api/enrollment/controllers/enrollment.js`): Calculates next enrollmentNumber per class.

### Auth Extensions (src/extensions/users-permissions/)

Custom `strapi-server.js` adds:
- `POST /auth/change-password` — Authenticated password change, manages `forcePasswordChange` flag.
- Modified login callback returns `forcePasswordChange` in response.
- Custom email confirmation flow with Brevo provider.

## Configuration

- **Database** (`config/database.js`): Supports PostgreSQL, MySQL, and SQLite via `DATABASE_CLIENT` env var. PostgreSQL is default in production.
- **Config Sync** (`config/sync/`): 52 JSON files backing up admin roles, content-type configs, and plugin settings. Auto-imported on Docker startup via `STRAPI_CONFIG_SYNC_IMPORT=true`.
- **Email**: Brevo provider (`config/plugins.js`). HTML email templates for password reset and confirmation are in the users-permissions extension.
- **CORS**: Allows `al-ahzar-front.vercel.app`,   `localhost:3000`, `localhost:1338`.
- **i18n**: Arabic (ar) and French (fr).
- **REST defaults** (`config/api.js`): defaultLimit=25, maxLimit=100, withCount=true.

## Docker Stack

Defined in `docker/docker-compose.yml`:
- **Caddy**: Reverse proxy with auto-HTTPS (Caddyfile at root)
- **Strapi**: Production Node.js app (multi-stage Dockerfile in `docker/`)
- **PostgreSQL 15**: Persistent data via `pgdata` volume

Entrypoint script (`docker/entrypoint.sh`) optionally runs config-sync import before starting Strapi.
