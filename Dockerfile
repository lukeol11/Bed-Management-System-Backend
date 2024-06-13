# Use the official Node.js 18 image as base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install NestJS dependencies
RUN npm install

# Copy the entire local directory to the working directory
COPY . .

# Expose port 3000 (or any port your NestJS app is listening to)
EXPOSE 3000

# Command to run your NestJS server using npm
CMD ["npm", "run", "start:prod"]
