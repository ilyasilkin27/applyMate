FROM oven/bun:1

WORKDIR /app

COPY package.json .
RUN bun install

COPY . .

EXPOSE 5001

CMD ["bun", "run", "src/index.ts"]
