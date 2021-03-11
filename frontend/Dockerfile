FROM node:15-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .
EXPOSE 8080

RUN npm run build
RUN npm run generate

CMD [ "npm", "run", "start" ]
