#!/bin/sh
set -eu

# Optional one-time-ish action; keep it off by default for production safety.
# Run manually when needed:
#   STRAPI_CONFIG_SYNC_IMPORT=1 docker compose up -d --build
# or:
#   docker compose run --rm -e STRAPI_CONFIG_SYNC_IMPORT=1 strapi
if [ "${STRAPI_CONFIG_SYNC_IMPORT:-}" = "1" ]; then
  echo "Running config-sync import..."
  yarn cs import -y
fi

exec "$@"

