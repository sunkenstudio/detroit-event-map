FROM node:20.11.1

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install

RUN npm run build

ENV PORT=5001

EXPOSE 5001

CMD [ "npm", "run", "start" ]