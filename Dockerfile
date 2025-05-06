# Use official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install

# Install dev dependencies if you need them (for dev environment)
RUN npm install --only=dev

# Copy the rest of your application
COPY . .

# Expose port 3000 (or the port your app uses)
EXPOSE 4500

# Command to run the app in production (change to "npm run dev" for development)
CMD ["npm", "start"]
