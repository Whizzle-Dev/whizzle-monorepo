FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY .. .

RUN apk add --no-cache python3 g++ make

RUN pnpm install

RUN pnpm --filter @whizzle/backend build

EXPOSE 3001

CMD ["node", "apps/api/dist/main.js"]
