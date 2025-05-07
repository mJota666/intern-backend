# Use an official Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Install build dependencies for bcrypt
RUN apt-get update && apt-get install -y build-essential python3

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose backend port
EXPOSE 8080

# Command to run the backend app
CMD ["npm", "run", "start"]
