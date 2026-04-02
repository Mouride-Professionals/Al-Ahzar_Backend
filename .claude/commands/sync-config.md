# sync-config

Manage Strapi config-sync operations.

## Usage
`/sync-config [import|export|status]`

## Instructions

- **export** — Run `yarn cs export` to snapshot current DB config (roles, permissions, plugin settings) into `config/sync/*.json`. Do this after changing admin roles or content-type permissions in the UI.
- **import** — Run `yarn cs import` to apply `config/sync/*.json` files to the DB. Used on fresh deployments (Docker entrypoint does this automatically via `STRAPI_CONFIG_SYNC_IMPORT=true`).
- **status** — Check `config/sync/` for the 52 JSON files. If counts differ significantly, suggest running export.

Always commit `config/sync/` changes alongside the code changes that required them.
