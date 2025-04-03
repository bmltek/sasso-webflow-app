FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps

# Copy only the necessary source files
COPY src/ ./src/

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4001
ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/userdb

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4001/health || exit 1

# Expose port
EXPOSE 4001

# Start the application
CMD ["npm", "start"]