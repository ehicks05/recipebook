FROM node:17-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
COPY ./prisma ./prisma
COPY *.env ./
RUN npm ci
RUN npm run prisma:generate
# COPY node_modules ./node_modules
RUN npx tsc

FROM node:17-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package*.json ./
COPY ./prisma ./prisma
RUN npm ci --only=production
RUN npm run prisma:generate
COPY --from=builder ./usr/src/app/dist ./dist
COPY ./.env ./

EXPOSE 8080
CMD [ "node", "dist/index.js" ]
