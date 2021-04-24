FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install typescript -g && \
  npm install

# Bundle app source
COPY . ./

# Build using tsc
#RUN npm run db:migrate:up insurance payment wallet && \
RUN npm run build

EXPOSE 3003
CMD [ "npm", "start" ]