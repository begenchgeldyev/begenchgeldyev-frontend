# syntax=docker/dockerfile:1

FROM oven/bun:1 as base
WORKDIR /usr/src/app

COPY index.html .
COPY server.ts .
COPY pages ./pages
COPY public ./public

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["bun", "server.ts"]
