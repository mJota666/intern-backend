# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Install native build tools (for bcrypt, etc.)
RUN apk add --no-cache build-base python3

# Copy deps and install
COPY package*.json ./
RUN npm ci

# Copy source & (optional) compile TS
COPY . .

# ─── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy production dependencies and source
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Expose your API port
EXPOSE 8080

# Start your backend
CMD ["npm", "run", "start"]
