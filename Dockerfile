# Use the official Node.js base image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to the PATH
#ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json
#COPY package.json ./
#COPY package-lock.json ./

# Install dependencies
#RUN npm install

# Copy the rest of the application code
COPY . ./

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
