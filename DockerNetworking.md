# Container networking
List existing networks:
```
$ docker network ls
NETWORK ID          NAME                DRIVER
075b9f628ccc        none                null
be0f7178486c        host                host
8022115322ec        bridge              bridge
```

The *bridge* network is the network in which containers are run by default. So that means that when I ran the ES container, it was running in this bridge network. To validate this, let's inspect the network

```
$ docker network inspect bridge
```


## Create our own network

```
$ docker network create ownnetwork
```
And then you can run container on new network:
```
docker run -dp 8080:8080 --net ownnetwork --name nt diatom:node_tests
```
