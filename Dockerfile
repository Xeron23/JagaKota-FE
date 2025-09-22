# Stage 1: Build React/Vite
FROM node:20-alpine AS build
WORKDIR /app

# install dependency native kalau ada package yang butuh
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

# pass env dari build args
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# Stage 2: Serve dengan Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
