FROM node:16-slim

WORKDIR /app

COPY package.json .
RUN npm install

COPY server.js .

RUN mkdir -p /jeel_PV_dir

EXPOSE 5000

CMD ["node", "server.js"]
