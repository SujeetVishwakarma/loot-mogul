# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port on which your Next.js app will run (default is 3000)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
