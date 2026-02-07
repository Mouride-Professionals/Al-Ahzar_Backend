#
# Production-focused Strapi v4 image.
# - Uses Node 20 (matches .nvmrc and Strapi 4 support)
# - Multi-stage build to keep runtime smaller
# - Debian slim to avoid common native-module pain on Alpine
#

FROM node:20-bookworm-slim AS base
WORKDIR /srv/app

ENV NODE_ENV=production

FROM base AS build

# Native deps for Strapi (sharp) and other native modules
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    git \
    ca-certificates \
    libvips \
  && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./

# Install all deps to build admin and compile native modules
RUN yarn install --frozen-lockfile

COPY . .

# Build Strapi admin
RUN yarn build

FROM base AS runtime

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    libvips \
  && rm -rf /var/lib/apt/lists/*

# Copy built app and deps
COPY --from=build /srv/app /srv/app

# Ensure writable dirs for Strapi
RUN mkdir -p /srv/app/.tmp /srv/app/public/uploads \
  && chown -R node:node /srv/app

COPY --chown=node:node docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

USER node

ENV HOST=0.0.0.0
ENV PORT=1337

EXPOSE 1337

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["yarn", "start"]

