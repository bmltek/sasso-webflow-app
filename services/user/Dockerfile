FROM node:20-alpine

WORKDIR /app

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4002/health || exit 1

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 4002

CMD ["npm", "start"]