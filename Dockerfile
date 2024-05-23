
FROM node:20-slim AS builder
WORKDIR /home/node/app

COPY package.json .
RUN npm i
COPY . .
RUN npm run build

FROM builder as final
LABEL org.opencontainers.image.source="https://github.com/patterns/public-rest-api-demo"
EXPOSE 8000
CMD ["dist/index.js"]


