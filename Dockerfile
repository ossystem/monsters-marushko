FROM node:8.16.0 as node

WORKDIR /var/www

COPY public/ public/
COPY server/ server/
COPY src/ src/
COPY .sequelizerc .sequelizerc
COPY package.json package.json
COPY webpack.config.js webpack.config.js

ENV NODE_ENV=prod
ENV NODE_PATH=/usr/local/lib/node_modules

RUN npm i && \
    npm i -g webpack && \
    npm run build

CMD ["npm", "run", "start"]
