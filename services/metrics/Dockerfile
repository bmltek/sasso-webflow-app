FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code and configuration files
COPY ./src ./src
COPY ./vitest.config.js ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4003
ENV DATABASE_URL=postgresql://user:password@host:5432/dbname

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4003/health || exit 1

# Expose port
EXPOSE 4003

# Start the application
CMD ["npm", "start"] 