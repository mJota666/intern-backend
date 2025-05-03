FROM node:18-alpine

# install build deps for bcrypt
RUN apk add --no-cache make g++ python3

WORKDIR /app

# copy only package files first (for caching)
COPY package*.json ./

# install production deps
RUN npm ci

# rebuild bcrypt so it’s correct for this container’s Linux environment
RUN npm rebuild bcrypt --build-from-source

# now copy the rest of your code
COPY . .

# build TypeScript
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]
