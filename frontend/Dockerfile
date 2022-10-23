FROM node:16-alpine

WORKDIR /app

COPY schema.graphql codegen.ts package.json tsconfig.json yarn.lock /app/

COPY graphql /app/graphql
COPY lib /app/lib
COPY pages /app/pages
COPY styles /app/styles
RUN  yarn install && yarn generate && yarn build
CMD [ "yarn", "start" ]
