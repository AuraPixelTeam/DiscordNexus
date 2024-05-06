FROM node:20

EXPOSE 203

WORKDIR /discordnexus

RUN mkdir /plugins /plugin_data
RUN npm i npm@latest -g

COPY package.json package-lock.json .env ./

RUN npm i

COPY . .

CMD [ "npm", "run", "start" ]