FROM node:18-alpine AS base
ARG ARG_PUBLIC_BASE_URL
ARG ARG_PUBLIC_API_URL
ARG ARG_PUBLIC_WEBSOCKET_URL
ARG ARG_BUILDTIME
ARG ARG_CRISP_ID
ENV NEXT_PUBLIC_BASE_URL=$ARG_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_API_URL=$ARG_PUBLIC_API_URL
ENV NEXT_PUBLIC_WEBSOCKET_URL=$ARG_PUBLIC_WEBSOCKET_URL
ENV NEXT_PUBLIC_BUILDTIME=$ARG_BUILDTIME
ENV NEXT_PUBLIC_CRISP_ID=$ARG_CRISP_ID
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
FROM base AS runner
USER root
WORKDIR /app
ENV NODE_ENV=production
RUN mkdir -p /app/logs
COPY --from=builder /app/public ./public
RUN mkdir .next
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
RUN echo "require('events').defaultMaxListeners = 500;" | cat - server.js > temporaryserverjs && mv temporaryserverjs server.js
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["sh", "-c", "node server.js >> /app/logs/app.log 2>&1"]
