FROM node:20-alpine
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY apps/api apps/api/
COPY pnpm-workspace.yaml ./
COPY tsconfig.json ./
COPY tsconfig.base.json ./

RUN apk add --update python3 make g++

RUN npm rebuild bcrypt --build-from-source

RUN pnpm install

RUN pnpm --filter @whizzle/backend build

ENTRYPOINT ["node"]
CMD ["apps/api/dist/main.js"]
