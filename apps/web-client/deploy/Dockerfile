FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn set version 3.6.1
RUN yarn install --immutable
RUN yarn web-client codegen
ENTRYPOINT yarn web-client build

VOLUME ["/app/apps/web-client/build"]
