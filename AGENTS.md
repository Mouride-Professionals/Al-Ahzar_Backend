# Repository Guidelines

## Project Structure & Module Organization
This repository is a Strapi v4 backend. Core application code lives in `src/`. Content APIs follow the Strapi pattern in `src/api/<feature>/` with `content-types/`, `controllers/`, `routes/`, `services/`, and `documentation/` directories. Admin customizations live in `src/admin/`, and plugin overrides live in `src/extensions/` such as `src/extensions/users-permissions/strapi-server.js`.

Runtime configuration is under `config/` (`database.js`, `server.js`, `plugins.js`). Checked-in Strapi config sync exports live in `config/sync/`. Database migrations belong in `database/migrations/`. Static uploads are served from `public/uploads/`. Treat `build/` and `types/generated/` as generated output.

## Build, Test, and Development Commands
Use Node `>=16 <=20` and prefer Yarn because `yarn.lock` is committed.

- `yarn develop`: start Strapi in development with auto-reload.
- `yarn build`: compile the admin panel for production.
- `yarn start`: run the production server.
- `yarn cs`: run config sync tooling against `config/sync/`.
- `docker compose up --build`: run Strapi, PostgreSQL, and Caddy locally with the container setup.

Use `.env.example` for local setup and `.env.docker.example` for containerized runs.

## Coding Style & Naming Conventions
Follow `.editorconfig` and `.eslintrc`: 2-space indentation, LF line endings, UTF-8, single quotes, and required semicolons. Keep server code in CommonJS style (`module.exports = ...`) to match the existing codebase.

Name Strapi APIs and folders in kebab-case when the content type already uses it, for example `school-year`. Keep controller and service files aligned with Strapi defaults unless there is a clear reason to diverge.

## Testing Guidelines
There is no formal automated test suite in this repository today. For backend changes, validate with `yarn build`, then exercise the affected admin flow or API endpoint in `yarn develop`. If you add import logic, use the CSV fixtures in the repo root for manual verification. Document any untested paths in the PR.

## Commit & Pull Request Guidelines
Recent history follows short, imperative commit subjects with prefixes like `feat:`, `fix:`, and `refactor:`. Keep that format and limit each commit to one logical change.

PRs should include a concise summary, affected modules or routes, required env/config updates, and manual verification steps. Link the issue when available. Include screenshots only when changing the Strapi admin UI or email templates.

## Security & Configuration Tips
Do not commit real secrets from `.env`, provider credentials, or production URLs unless intentionally updating environment defaults. Review changes in `config/sync/` carefully because role and permission exports affect live access control.
