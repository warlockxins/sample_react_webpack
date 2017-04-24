# Live reload and Building

In the current project we need to run `webpack` command to build the minified client code. It will be tiresome to reload the page and even *more* to rebuild the docker image for every *src* change.

To avoid that look at `docker.webpack` in root folder of the project

``
docker build -t my-webpack -f docker.webpack .
``
