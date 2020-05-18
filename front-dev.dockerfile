FROM node:14.2.0 AS build
WORKDIR /home/node/app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

FROM node:14.2.0-alpine3.10
WORKDIR /home/node/app
COPY --from=build /home/node/app/node_modules ./node_modules
# COPY . .
CMD yarn serve