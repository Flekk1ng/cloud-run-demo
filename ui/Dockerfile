FROM node:17-alpine

WORKDIR /app/ui

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]