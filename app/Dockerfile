
# Use an official Node.js runtime as the base image
FROM node:10.10.0

# Set the working directory in the container
WORKDIR /app

# Copy your Node.js application files into the container
COPY . .
RUN npm install
RUN npm install gulp -g

# Expose a port if your application listens on a specific port
EXPOSE 9001

# Define the command to start your Node.js application
# CMD ["node", "server.js"]
CMD [ "gulp", "js", "scripts" ]
