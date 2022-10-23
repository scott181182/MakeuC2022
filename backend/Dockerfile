FROM node:16-alpine

WORKDIR /app

COPY package.json tsconfig.json yarn.lock keystone.ts schema.graphql schema.prisma /app/
# COPY components /app/components
#COPY graphql /app/graphql
#COPY lib /app/lib
#COPY pages /app/pages
#COPY styles /app/styles
COPY src /app/src
COPY migrations /app/migrations


RUN yarn install && yarn build
CMD [ "yarn", "start" ]

