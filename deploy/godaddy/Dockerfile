FROM node:22-bookworm-slim AS build

WORKDIR /app
RUN corepack enable

COPY . .
RUN pnpm install --frozen-lockfile

ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_CLERK_PROXY_URL
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PROXY_URL=$VITE_CLERK_PROXY_URL

RUN PORT=3000 BASE_PATH=/ pnpm --filter @workspace/gym-management run build
RUN pnpm --filter @workspace/api-server run build

FROM node:22-bookworm-slim

WORKDIR /app
ENV NODE_ENV=production
ENV WEB_DIST_DIR=/app/public

COPY --from=build /app/artifacts/api-server/dist ./api-dist
COPY --from=build /app/artifacts/gym-management/dist/public ./public

EXPOSE 8080
CMD ["node", "/app/api-dist/index.mjs"]