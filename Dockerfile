FROM node:16-alpine

RUN mkdir -p /src

COPY package.json /src/package.json

WORKDIR /src

RUN yarn install

COPY . /src

CMD yarn dev