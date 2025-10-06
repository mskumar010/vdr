# Stage 1: Base image for dependencies installation
FROM node:18-alpine as base

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Stage 2: Development Environment
FROM base as development

# Install dependencies for development (including hot-reload)
RUN npm install --only=development

# Expose port for hot-reload in dev mode
EXPOSE 5173  
# Vite default port for dev server
CMD ["npm", "run", "dev"]  # This will start the dev server

# Stage 3: Production Environment (optimized for serving the app)
FROM base as production

# Build app for production (optimizes bundle)
COPY . . 
RUN npm run build  # Build optimized React app

# Use Nginx to serve static content
FROM nginx:alpine as final
COPY --from=production /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
