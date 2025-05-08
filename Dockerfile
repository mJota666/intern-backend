# ─── Stage 1: Builder ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Install native build tools for bcrypt, etc.
RUN apk add --no-cache build-base python3

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# RUN npm run build

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────────
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy over just the production-ready files and modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Expose your API port
EXPOSE 8080

# Launch your backend
CMD ["npm", "run", "start"]
