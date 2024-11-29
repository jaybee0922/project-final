FROM node:22

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 5000 (the port your Node.js app listens on)
EXPOSE 5000

# Run the app (make sure the path to app.js is correct)
CMD ["node", "./src/app.js"]
