# Use the official Node.js Alpine image as the base image
FROM node:20-alpine

ARG APP_ENV="production"
ARG APP_PORT=1337

# Install dependencies
RUN apk --no-cache add nasm python3 make g++

# Set up the working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and yarn.lock (if exists)
COPY package.json yarn.lock* ./

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
RUN mkdir -p /usr/src/app/.tmp && chmod 755 /usr/src/app/.tmp
RUN chmod 755 -R /usr/src/app/src/*
RUN mkdir -p /usr/src/app/public/uploads && chmod 755 -R /usr/src/app/public/uploads

# Expose the application port
EXPOSE ${APP_PORT}

# Run the application with config sync import
CMD ["sh", "-c", "yarn cs import -y && yarn create-admin && yarn start"]