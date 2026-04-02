# new-api

Create a new Strapi v4 API endpoint for this project.

## Usage
`/new-api <collection-name> [description]`

## Instructions

When creating a new content type or custom endpoint:

1. **Content type** — scaffold under `src/api/<name>/`:
   - `content-types/<name>/schema.json` — define attributes, use existing types as reference (e.g. `src/api/student/content-types/student/schema.json`)
   - `controllers/<name>.js` — extend default controller if custom logic needed
   - `routes/<name>.js` — extend or define custom routes
   - `services/<name>.js` — business logic

2. **Custom route** — add to existing routes file, then implement in the controller using the pattern in `src/api/payment/controllers/payment.js` (stats endpoint) or `src/api/school-year/controllers/school-year.js` (state transitions).

3. **Always scope to school + schoolYear** — most collections need both relations to maintain data isolation.

4. **After adding** — run `yarn cs export` to update `config/sync/` JSON files if roles/permissions changed.
