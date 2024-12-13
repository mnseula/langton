# Build stage
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy the application code
COPY . .

# Install dependencies
RUN npm ci

# Build the application
RUN npx expo export:web

# Production image
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=builder /app/web-build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 9005
EXPOSE 9005

# Start nginx
CMD ["nginx", "-g", "daemon off;"]