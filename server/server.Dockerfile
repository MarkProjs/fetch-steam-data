FROM node:18
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
ENTRYPOINT ["npm", "run","start"]