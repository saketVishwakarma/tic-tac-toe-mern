# Use a Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your Vite app runs on
EXPOSE 3000

# Command to run the application (for development)
CMD ["npm", "run", "dev"]
