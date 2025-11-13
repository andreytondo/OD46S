# ---------- Stage 1: Build ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build -- --configuration production

# ---------- Stage 2: Runtime (nginx) ----------
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/dainf-client/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy config template and entrypoint script
COPY config.template.json /config.template.json
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV TZ=America/Sao_Paulo

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
