# Dockerfile to work with Docker Compose (for Render deployment)

# Use the official Docker image with Docker Compose pre-installed
FROM docker/compose:1.29.2

# Set the working directory in the container
WORKDIR /app

# Copy the docker-compose.yml file to the container
COPY docker-compose.yml .

# Build and start the services defined in docker-compose.yml
CMD ["up", "--build"]
