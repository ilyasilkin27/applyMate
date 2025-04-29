FROM oven/bun:latest

WORKDIR /app

COPY package.json tsconfig.json ./

RUN bun install

COPY . .

EXPOSE 5002

CMD ["bun", "run", "server.ts"]