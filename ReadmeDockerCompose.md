# Live reload and Building

In the current project we need to run `webpack` command to build the minified client code. It will be tiresome to reload the page and even *more* to rebuild the docker image for every *src* change.

To avoid that look at `docker.webpack` in root folder of the project

```
docker build -t my-webpack -f docker.webpack .
```

Look at `docker-compose.yml` to see how two contaners work together. To build several containers use command below, it will read and build `docker-compose.yml`.
```
docker-compose up --build -d
```

After build is done you can look into running containers by:

```
docker ps
// copy container id of interest
docker exec -it <container id> bash
```
this will enter your container applications `WORKDIR` & you will be able to execute comands inside container.