FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

# Define the command to run the application
CMD ["npm", "run", "start:prod"]