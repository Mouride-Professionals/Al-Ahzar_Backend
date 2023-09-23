FROM node:16.17.0

USER root

RUN apt-get upgrade && apt-get update && apt-get install nasm

RUN mkdir -p /usr/src/app

ARG APP_ENV

WORKDIR /usr/src/app

COPY .env.example  ./.env
# COPY .env.$APP_ENV.example  ./.env.production.local

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

# RUN yarn cs import -y

USER $USER

EXPOSE 1338

CMD ["yarn", "start"]
