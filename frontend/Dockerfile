FROM node:12

RUN mkdir /code
RUN mkdir /code/frontend
WORKDIR /code/frontend

VOLUME /code/frontend
VOLUME /code/frontend/node_modules

CMD ["yarn", "dev"]