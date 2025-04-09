# Step 1: Use a base image with Node.js. Nuxt 3 requires Node.js 14 or later.
FROM node:22-alpine

ARG NUXT_UI_PRO_LICENSE

ENV NUXT_UI_PRO_LICENSE=${NUXT_UI_PRO_LICENSE}

WORKDIR /app

RUN npm install -g pnpm nuxi

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY docs/package.json ./docs/
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

WORKDIR /app

RUN pnpm run docs:build

ENV PORT 3000
EXPOSE 3000

CMD ["node", "./docs/.output/server/index.mjs"]