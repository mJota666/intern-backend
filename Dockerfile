# # Use the official Node.js image as a base
# FROM node:16

# # Set the working directory inside the container
# WORKDIR /app

# # Install build dependencies for bcrypt
# RUN apt-get update && apt-get install -y build-essential python3

# # Copy package.json and package-lock.json to install dependencies
# COPY package*.json ./

# # Install the dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose the application port
# EXPOSE 3000

# # Start the application
# CMD ["npm", "run", "start:dev"]

# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install dependencies
RUN npm install

# Expose the backend port
EXPOSE 8080

# Command to run the app
CMD ["npm", "run", "start"]
