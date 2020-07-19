FROM node:12.16.2
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN cd /usr/src/app

COPY . /usr/src/app
RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:dev"]