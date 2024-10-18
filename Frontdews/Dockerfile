FROM node:18
WORKDIR /Frontdews
COPY package.json package-lock.json ./
COPY . .
RUN npm install --legacy-peer-deps
EXPOSE 4200
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "4200"]


# # Set the working directory in the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Copy the rest of the application code
# COPY . .


# # Install project dependencies (bypass peer dependency conflicts)
# RUN npm install --legacy-peer-deps


# # Build the Angular app using the globally installed Angular CLI

# # Expose port 4200 for the Angular app
# EXPOSE 4200

# # Serve the Angular application

# CMD ["npm", "run", "start"]

