FROM node:10-alpine

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

ENV APP_ENV=prod

COPY . /home/node/app

RUN ls -lrt

EXPOSE 9191

CMD ["npm", "start"]