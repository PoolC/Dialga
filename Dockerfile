FROM node:20-alpine AS build

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
COPY packages/react-editor/package.json packages/react-editor/package.json
COPY websites/poolc.org/package.json websites/poolc.org/package.json

RUN yarn install --immutable

COPY . .

ARG VITE_API_BASE_URL=https://dev.poolc.org/api
ARG VITE_FILE_URL=https://dev.poolc.org/api
ARG VITE_PKS_GITEA_URL=https://git.poolc.org

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_FILE_URL=$VITE_FILE_URL
ENV VITE_PKS_GITEA_URL=$VITE_PKS_GITEA_URL

RUN yarn workspace @dialga/poolc.org build

FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY websites/poolc.org/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/websites/poolc.org/build /usr/share/nginx/html

EXPOSE 8080
