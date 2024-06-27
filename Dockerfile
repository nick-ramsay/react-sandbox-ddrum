# Use the official Node.js image as the base image
FROM node:21

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN yarn run build

# Install a simple HTTP server to serve static content
RUN yarn global add serve

# Expose port 3000
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "build"]