FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --no-audit --no-fund --no-optional

# Copy only the necessary source files
COPY src/ ./src/

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4003
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/metricsdb

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4003/health || exit 1

# Expose port
EXPOSE 4003

# Start the application
CMD ["npm", "start"]