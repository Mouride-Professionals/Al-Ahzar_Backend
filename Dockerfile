# Use the official Node.js image as the base image
FROM node:18-alpine

# Install NASM (Netwide Assembler)
RUN npm install -g node-gyp

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY .env.example  ./.env

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

EXPOSE 1337

CMD ["yarn", "start"]
