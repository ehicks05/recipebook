FROM node:12.17.0-alpine AS builder

WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
COPY prisma ./prisma
COPY *.env ./
RUN npm ci
RUN npm run prisma:generate
COPY node_modules ./node_modules
RUN npm run build


FROM node:12.17.0-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production
RUN npm run prisma:generate
COPY --from=builder /home/node/app/build ./build
COPY ./.env ./

EXPOSE 8080
CMD [ "node", "build/index.js" ]
