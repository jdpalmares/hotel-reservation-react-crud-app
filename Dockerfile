FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
ENV PORT 3000

ENV NODE_OPTIONS="--max-old-space-size=8192"

CMD [ "npm", "start" ]