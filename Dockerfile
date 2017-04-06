FROM node:7.7.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn install

COPY gulpfile.js /usr/src/app
RUN yarn setup

COPY src/main /usr/src/app/src/main
COPY config /usr/src/app/config
COPY ssl /usr/src/app/ssl

EXPOSE 3443
CMD [ "yarn", "start" ]
