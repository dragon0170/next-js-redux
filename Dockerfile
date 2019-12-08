FROM alpine:3.10

RUN apk add yarn

RUN mkdir -p /root/ticle
WORKDIR /root/ticle

COPY . /root/ticle
RUN yarn
RUN yarn build
EXPOSE 3000

CMD yarn start
