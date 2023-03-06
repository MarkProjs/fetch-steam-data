FROM node:18
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
ENV DB_URI= mongodb+srv://azir_enjoyer:HDZe6Lx8fsJzkzdL@cluster0.ycsgxv5.mongodb.net/reviews
EXPOSE 3001
ENTRYPOINT ["npm", "run","start"]