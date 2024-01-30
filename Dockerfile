# Use the official Node.js image as the base image
FROM node:latest

ARG APP_ENV
ARG APP_PORT

# Install dependencies
RUN apk add --no-cache nasm python3 make g++

# Set up the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy necessary files
COPY .env.${APP_ENV}  ./.env
COPY package.json ./

# Update npm and install node-gyp globally
RUN npm install -g npm@latest
RUN npm install -g node-gyp

# Clean npm cache
RUN npm cache clean --force

# Install Node.js dependencies
RUN yarn

# Copy the rest of the application files
COPY . .

# Build the application
RUN yarn build

# Set appropriate permissions
RUN mkdir -p /usr/src/app/.tmp && chmod 777 /usr/src/app/.tmp
RUN chmod 777 -R /usr/src/app/src/*
RUN mkdir -p /usr/src/app/public/uploads && chmod 777 -R /usr/src/app/public/uploads

# Import code style settings
RUN yarn cs import -y

# Expose the application port
EXPOSE ${APP_PORT}

# Run the application
CMD ["yarn", "start"]
