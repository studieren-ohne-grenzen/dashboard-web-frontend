FROM node:16

WORKDIR /app
COPY ./ ./

RUN yarn install

RUN yarn build

ENTRYPOINT ["yarn", "start", "--hostname", "0.0.0.0"]
