# PROD CONFIG
FROM node:12 as prod

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production

CMD [ "npm", "start" ]