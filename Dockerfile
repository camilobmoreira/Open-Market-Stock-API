#FROM node:12
FROM redis:alpine

RUN apk add --update npm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production

RUN chmod +x ./start.sh

CMD [ "./start.sh" ]