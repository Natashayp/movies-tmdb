# Stage 1: Build
FROM node:lts-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app source
COPY . .

# Build Next.js app
RUN npm run build

# Stage 2: Run app
FROM node:lts-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy built artifacts
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next-env.d.ts ./ 
COPY --from=builder /app/tsconfig.json ./

# Expose correct port for Cloud Run
EXPOSE 8080

# Run Next.js (listen on the PORT env var)
CMD ["npm", "start"]