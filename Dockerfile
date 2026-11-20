# notjustanna.net: the Astro build served by nginx. Built by .github/workflows/deploy.yaml for summernights (arm64).
FROM docker.io/library/node:22-alpine AS build
WORKDIR /src
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile && pnpm run build
# What the deploy workflow polls on the origin to know the new image is live before purging Fastly.
ARG SITE_VERSION=dev
RUN echo "$SITE_VERSION" > dist/version.txt

FROM docker.io/library/nginx:1.30-alpine-slim
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/dist /usr/share/nginx/html
