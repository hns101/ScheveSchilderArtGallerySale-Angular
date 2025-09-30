# Multi-stage build for Angular application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli@20.3.1

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application for production
RUN npm run build --prod

# Debug: Show what was built
RUN echo "=== Contents of /app/dist ===" && \
    find /app/dist -type f -name "*.html" -o -name "*.js" -o -name "*.css" | head -20

# Production stage
FROM nginx:alpine AS production

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from build stage
# Use the correct path based on your build output
COPY --from=build /app/dist/ScheveSchilderBackyardSale/browser/ /usr/share/nginx/html/

# No need to copy public assets separately since they're already in the browser folder

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
