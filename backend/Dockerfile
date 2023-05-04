# Base image
FROM node:latest

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

RUN npm install -g @angular/cli

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["tail", "-f", "/dev/null"]
