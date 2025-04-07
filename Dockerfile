# Step 1: Use a base image with Node.js. Nuxt 3 requires Node.js 14 or later.
FROM node:22-alpine

ARG NUXT_UI_PRO_LICENSE

ENV NUXT_UI_PRO_LICENSE=${NUXT_UI_PRO_LICENSE}

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY docs/package.json ./docs/
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

WORKDIR /app/docs

RUN pnpm run --filter ./docs build

ENV PORT 3000
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]