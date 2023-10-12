
FROM oven/bun:alpine AS builder
WORKDIR /usr/src/app
COPY package.json ./
COPY bun.lockb ./
COPY src ./
RUN bun install

FROM oven/bun:alpine
LABEL org.opencontainers.image.source="https://github.com/patterns/public-rest-api-demo"
WORKDIR /app
EXPOSE 8080
COPY --from=builder /usr/src/app/src/ ./
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["index.ts"]


