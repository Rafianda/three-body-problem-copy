# frontend/Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine

# Copy hasil build React/Vite/Next/etc dari stage build
COPY --from=build /app/build /usr/share/nginx/html

# 🛠️ Fix permission untuk cache/temp dir yang dibutuhkan nginx
RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R nginx:nginx /var/cache/nginx

# 🔐 Jalankan sebagai user non-root
USER nginx

EXPOSE 80
