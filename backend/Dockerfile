FROM node:12
RUN mkdir /code
WORKDIR /code
RUN yarn
COPY . /code/
CMD ["yarn", "watch"]