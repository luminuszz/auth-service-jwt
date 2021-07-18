FROM node

WORKDIR /home/services

COPY package.json .

COPY yarn.lock .

RUN yarn

CMD yarn start:dev 
