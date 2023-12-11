FROM node:14

COPY package*.json ./

RUN npm install

COPY /backend/* ./

EXPOSE 3000

CMD ["node", "app.js"]
