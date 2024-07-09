FROM node:17-alpine

WORKDIR /app/ui

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "preview"]