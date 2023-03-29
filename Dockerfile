FROM node:19-slim

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3009

CMD ["npm", "start"]