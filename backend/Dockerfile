# syntax=docker/dockerfile:1

FROM oven/bun:1
WORKDIR /usr/src/app

COPY backend ./backend
COPY src ./src

WORKDIR /usr/src/app/backend

EXPOSE 8613

CMD ["bun", "server.ts"]
