FROM node:16-alpine

WORKDIR /app

COPY codegen.ts next.config.js postcss.config.js tailwind.config.js package.json tsconfig.json yarn.lock /app/
# COPY components /app/components
COPY graphql /app/graphql
COPY lib /app/lib
COPY pages /app/pages
COPY styles /app/styles

RUN yarn install && yarn build
CMD [ "yarn", "start" ]
