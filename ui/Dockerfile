FROM node:17-alpine

WORKDIR /app/ui

COPY package.json .

COPY . .

RUN npm install

EXPOSE 80

CMD ["npm", "run", "build"]