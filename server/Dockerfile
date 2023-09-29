# Server Dockerfile

# Use the official Node.js 14 base image
FROM node:16

# Set the working directory in the container
WORKDIR /app/server

# Copy the server code to the container
COPY ./server .

# Copy package.json and package-lock.json to the container
COPY ./server/package*.json ./

# List the contents of the directory (for debugging purposes)
# RUN ls

# Remove existing node_modules
RUN rm -rf node_modules

# Install server dependencies
RUN yarn

# Expose port 3000 (or the port you use for the server)
EXPOSE 3001

# Start the server with nodemon for live editing
CMD ["npm", "start"]