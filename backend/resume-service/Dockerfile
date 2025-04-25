FROM oven/bun:latest AS build

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:latest

WORKDIR /app

COPY --from=build /app/build /app/build

EXPOSE 5001

CMD ["bun", "run", "start"]
