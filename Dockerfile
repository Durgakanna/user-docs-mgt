
FROM node:23.8.0-alpine3.20

# Set the working directory
WORKDIR /usr/src/app/

# Copy the build output from the previous stage
COPY . .

# Install prod dependencies only
RUN npm install --only=production

# Expose the port on which the application will listen
EXPOSE 8000

# Start the application
CMD ["node" "run" "start"]