FROM node:12-alpine3.14
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm","start"]
EXPOSE 9000
