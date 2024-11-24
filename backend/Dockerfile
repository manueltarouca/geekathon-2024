# stage 1
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate

# stage 2 
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
ENTRYPOINT ["/app/entrypoint.sh"]
