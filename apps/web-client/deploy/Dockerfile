FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn set version 3.6.1
RUN yarn workspace @poolc-dialga/web-client codegen
CMD yarn workspace @poolc-dialga/web-client build

VOLUME ["/app/apps/web-client/build"]
