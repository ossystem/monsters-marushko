FROM node:8.16.0 as node

WORKDIR /var/www

ENV NODE_ENV=prod
ENV NODE_PATH=/usr/local/lib/node_modules

COPY package.json package.json

RUN npm i && \
    npm i -g webpack

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
