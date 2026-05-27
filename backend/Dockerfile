FROM node:22-slim AS base
WORKDIR /app
RUN corepack enable

FROM base AS dev
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]

FROM base AS build
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:22-slim AS prod
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
