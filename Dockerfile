FROM node:6.9.1-wheezy

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm install -g nodemon
# Bundle app source
#COPY . /usr/src/app
ADD . /usr/src/app

RUN node ./node_modules/webpack/bin/webpack.js
# Expose the port used by Node.js
EXPOSE 8085

# start the app
CMD ["nodemon", "--debug", "/usr/src/app"]
