# Use the official Node.js image as the base image
FROM node:18-alpine

ARG APP_ENV

ARG APP_PORT

RUN apk --no-cache add nasm

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY .env.${APP_ENV}  ./.env

COPY package.json ./

RUN yarn cache clean
RUN yarn

COPY . .

RUN yarn build

RUN mkdir -p /usr/src/app/.tmp
RUN chmod 777 /usr/src/app/.tmp

RUN chmod 777 -R /usr/src/app/src/*

RUN mkdir -p /usr/src/app/public/uploads
RUN chmod 777 -R /usr/src/app/public/uploads

RUN yarn cs import -y

EXPOSE ${APP_PORT}

CMD ["yarn", "start"]
