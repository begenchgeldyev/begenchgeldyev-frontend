# syntax=docker/dockerfile:1

FROM oven/bun:1
WORKDIR /usr/src/app

COPY server.ts .
COPY api ./api

EXPOSE ${PORT}

CMD ["bun", "server.ts"]
