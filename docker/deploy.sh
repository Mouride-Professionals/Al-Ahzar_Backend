#!/bin/sh
set -eu

REGISTRY_HOST='registry.digitalocean.com'
IMAGE_REPOSITORY="${REGISTRY_HOST}/africadex-registry/al-azhar-backend"

if [ -z "${GITHUB_SHA:-}" ]; then
  echo 'Missing required environment variable: GITHUB_SHA' >&2
  exit 1
fi

if ! command -v doctl >/dev/null 2>&1; then
  echo 'doctl is required for read-only registry authentication.' >&2
  exit 1
fi

if [ ! -f .env ]; then
  echo 'Missing deployment environment file: /opt/al-azhar/.env' >&2
  exit 1
fi

if [ "${#GITHUB_SHA}" -ne 40 ]; then
  echo 'GITHUB_SHA must be a 40-character Git SHA.' >&2
  exit 1
fi

case "$GITHUB_SHA" in
  *[!0-9a-f]*)
    echo 'GITHUB_SHA must contain only lowercase hexadecimal characters.' >&2
    exit 1
    ;;
esac

image_reference="${IMAGE_REPOSITORY}:${GITHUB_SHA}"
registry_config_dir=$(mktemp -d /tmp/alazhar-registry-auth.XXXXXX)
export DOCKER_CONFIG="$registry_config_dir"

cleanup_registry_auth() {
  docker logout "$REGISTRY_HOST" >/dev/null 2>&1 || true
  rm -f "${registry_config_dir}/config.json"
  rmdir "$registry_config_dir" >/dev/null 2>&1 || true
}
trap cleanup_registry_auth EXIT HUP INT TERM

doctl registry login \
  --read-only \
  --expiry-seconds 600

IMAGE_TAG="$GITHUB_SHA" docker compose pull strapi

expected_image_id=$(docker image inspect --format '{{.Id}}' "$image_reference")

docker run --rm \
  --network none \
  --entrypoint node \
  "$image_reference" \
  docker/verify-deployment-config.js

expected_role_permissions=$(
  docker run --rm \
    --network none \
    --entrypoint node \
    "$image_reference" \
    docker/verify-deployment-config.js --permissions-count
)

image_tag_count=$(grep -c '^IMAGE_TAG=' .env || true)
if [ "$image_tag_count" -gt 1 ]; then
  echo '.env contains more than one IMAGE_TAG entry; refusing to choose between them.' >&2
  exit 1
fi

if [ "$image_tag_count" -eq 1 ]; then
  sed -i "s/^IMAGE_TAG=.*/IMAGE_TAG=${GITHUB_SHA}/" .env
else
  printf '\nIMAGE_TAG=%s\n' "$GITHUB_SHA" >> .env
fi

resolved_image=$(docker compose config --images | grep '/al-azhar-backend:' | head -n 1)
if [ "$resolved_image" != "$image_reference" ]; then
  echo "Compose resolved $resolved_image instead of $image_reference" >&2
  exit 1
fi

docker compose up -d --no-build

strapi_container_id=$(docker compose ps -q strapi)
if [ -z "$strapi_container_id" ]; then
  echo 'Compose did not create the Strapi container.' >&2
  exit 1
fi

running_image_reference=$(
  docker inspect --format '{{.Config.Image}}' "$strapi_container_id"
)
running_image_id=$(docker inspect --format '{{.Image}}' "$strapi_container_id")

if [ "$running_image_reference" != "$image_reference" ]; then
  echo \
    "Running Strapi references $running_image_reference instead of $image_reference" \
    >&2
  exit 1
fi

if [ "$running_image_id" != "$expected_image_id" ]; then
  echo \
    "Running Strapi image ID $running_image_id does not match pulled image ID $expected_image_id" \
    >&2
  exit 1
fi

health_attempt=0
strapi_health='starting'
while [ "$health_attempt" -lt 30 ]; do
  strapi_health=$(
    docker inspect \
      --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' \
      "$strapi_container_id"
  )

  case "$strapi_health" in
    healthy)
      break
      ;;
    exited|dead)
      docker compose logs --tail=100 strapi
      echo "Strapi entered state: $strapi_health" >&2
      exit 1
      ;;
  esac

  health_attempt=$((health_attempt + 1))
  sleep 5
done

if [ "$strapi_health" != 'healthy' ]; then
  docker compose logs --tail=100 strapi
  echo 'Strapi did not become healthy within 150 seconds.' >&2
  exit 1
fi

if ! role_sync_output=$(
  docker compose run --rm --no-deps strapi \
    yarn cs import -y --type user-role 2>&1
); then
  printf '%s\n' "$role_sync_output"
  echo 'Role synchronization command failed.' >&2
  exit 1
fi
printf '%s\n' "$role_sync_output"

if printf '%s\n' "$role_sync_output" | grep -Fq '[error]'; then
  echo 'Config Sync reported an error.' >&2
  exit 1
fi

if ! printf '%s\n' "$role_sync_output" | grep -Eq \
  '\[success\] Finished import|\[notice\] There are no changes (to import|for the specified config)\.'; then
  echo 'Config Sync did not report a recognized successful result.' >&2
  exit 1
fi

actual_role_permissions=$(
  docker compose exec -T db sh -c \
    'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Atc "SELECT count(*) FROM up_permissions;"'
)

if [ "$actual_role_permissions" != "$expected_role_permissions" ]; then
  echo \
    "Permission verification failed: expected $expected_role_permissions, found $actual_role_permissions" \
    >&2
  exit 1
fi

printf '%s\n' \
  "Deployment completed for ${GITHUB_SHA}" \
  "Role permissions verified: ${actual_role_permissions}"
