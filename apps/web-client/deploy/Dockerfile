FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn set version 3.7.0
RUN yarn install --immutable --immutable-cache
RUN yarn web-client codegen
ENTRYPOINT yarn web-client build

VOLUME ["/app/apps/web-client/build"]
