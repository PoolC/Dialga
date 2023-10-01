FROM node:18-alpine

WORKDIR /app


COPY package.json yarn.lock ./
RUN yarn

COPY . .

RUN yarn codegen
CMD yarn build

VOLUME ["/app/build"]
