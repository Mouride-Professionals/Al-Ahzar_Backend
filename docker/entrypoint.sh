#!/bin/sh
set -eu

# Emergency opt-in only. Normal production role synchronization is performed by
# docker/deploy.sh after the immutable deployment image passes its preflight.
if [ "${STRAPI_CONFIG_SYNC_IMPORT:-}" = "1" ]; then
  echo "Running role-only config-sync import..."
  yarn cs import -y --type user-role
fi

exec "$@"
