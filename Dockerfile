FROM node:19-slim

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]