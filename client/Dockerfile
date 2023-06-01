# Client Dockerfile

# Use the official Node.js 14 base image
FROM node:16 AS client-build

# Set the working directory in the container
WORKDIR /app/client

# Copy the client code to the container
COPY ./client .

# Copy package.json and package-lock.json to the container
COPY ./client/package*.json ./

# List the contents of the directory (for debugging purposes)
# RUN ls

# Remove existing node_modules
RUN rm -rf node_modules

# Install client dependencies
RUN npm install

# Expose port for the client
EXPOSE 19000

# Start the development server with hot-reloading
CMD ["npm", "run", "web"]
