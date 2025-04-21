FROM node:18-alpine AS build

WORKDIR /usr/src/app
COPY app/package*.json ./
COPY app/vite.config.ts ./
COPY app/tsconfig.json ./
RUN npm ci

COPY app/ ./
RUN npm run build

FROM nginx:stable-alpine AS prod

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
