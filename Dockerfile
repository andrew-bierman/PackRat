# Use an official node runtime as the parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the main package.json and package-lock.json
COPY package*.json ./

# Copy the entire project into the container
COPY . .

# Install all dependencies
RUN npm run install:all

# Build the application for production
RUN npm run build:prod

# Specify the command to run on container start
CMD [ "npm", "run", "start:prod" ]
