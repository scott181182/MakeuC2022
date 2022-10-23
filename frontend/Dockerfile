FROM node:16-alpine

WORKDIR /app

COPY keystone.ts package.json tsconfig.json yarn.lock /app/
COPY src /app/src

RUN NOPOSTINSTALL=1 yarn install && yarn build
CMD [ "yarn", "start" ]
