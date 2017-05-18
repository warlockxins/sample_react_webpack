FROM node:6.9.1-wheezy

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
#COPY . /usr/src/app
ADD . /usr/src/app

RUN node ./node_modules/webpack/bin/webpack.js
# Expose the port used by Node.js
EXPOSE 8085

# start the app
CMD ["node", "--debug", "/usr/src/app"]
