FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY next.config.* ./
COPY jsconfig.json ./
COPY .eslintrc* ./

RUN npm ci --legacy-peer-deps 

COPY . .

ARG NEXT_PUBLIC_URL_BACKEND
ENV NEXT_PUBLIC_URL_BACKEND=${NEXT_PUBLIC_URL_BACKEND}

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]