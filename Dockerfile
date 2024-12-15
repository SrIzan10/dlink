FROM node:alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

FROM node:alpine

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/index.js ./

ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "index.js"]