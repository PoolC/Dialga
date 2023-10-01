FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn codegen
CMD yarn build

VOLUME ["/app/build"]
