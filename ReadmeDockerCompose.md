# Live reload and Building

In the current project we need to run `webpack` command to build the minified client code. It will be tiresome to reload the page and even *more* to rebuild the docker image for every *src* change.

To avoid that look at `Dockerfile-develop` in root folder of the project, it runs installed *webpack* app. You can see command that is live loading and compiling all your client side code
```
RUN webpack --watch --watch-polling
```
then current source code will be compiled automatically and put in specigic folder according to webpack.config.js :)

We also use Mongo database in the project, how to add it?
Look at `docker-compose-development.yml` to see how ;) To build several containers at the same time use command below, it will read and build `docker-compose-development.yml`.
```
docker-compose -f docker-compose-development.yml up --build -d
```

After build is done you can look into running containers by:

```
docker ps
// copy container id of interest
docker exec -it <container id> bash
```
this will enter your container applications `WORKDIR` & you will be able to execute comands inside container.

After this you will be able to see project running on *http://localhost:8085/*
