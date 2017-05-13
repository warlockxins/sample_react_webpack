# Swarm mode

Docker Engine 1.12 introduces swarm mode that enables you to create a cluster of one or more Docker Engines called a swarm. A swarm consists of one or more nodes: physical or virtual machines running Docker Engine 1.12 or later in swarm mode.

### Manager nodes
Manager nodes handle cluster management tasks:

- maintaining cluster state
- scheduling services
- serving swarm mode HTTP API endpoints

### Worker nodes
Worker nodes are also instances of Docker Engine whose sole purpose is to execute containers. Worker nodes don’t participate in the Raft distributed state, make scheduling decisions, or serve the swarm mode HTTP API.

You can create a swarm of one manager node, but you cannot have a worker node without at least one manager node. By default, all managers are also workers. In a single manager node cluster, you can run commands like docker service create and the scheduler will place all tasks on the local Engine.

## Creating swarm

Create one network for docker images to reside in:
```
  docker network create -d overlay preferredNetworkName
```

Then create instances of your docker containers:
```
docker service create -p 8080:80 --replicas 2 --network preferredNetworkName --name assignedName creatorName/imageName
```

If need to assign another amount of replicas - instances of containers, then do
```
docker service update --replicas=4 assignedName
```

# Docker Machine

The first tool we’ll look at from the toolbox is Docker Machine, which will help you create container hosts on many of the most popular Infrastructure-as-a-Service platforms. Of course, you can use the two most popular desktop virtualization platforms: VMware Fusion and VirtualBox, but it also supports other platforms such as AWS, Azure, DigitalOcean, Exoscale, Google Compute Engine, OpenStack, RackSpace, SoftLayer, VMware vSphere, and vCloud Air.

```
docker-machine create -d virtualbox local
eval "$(docker-machine env local)"
docker run swarm create
```
The *create* command will give you token, which you use to create Docker machines:
```
docker-machine create -d virtualbox --swarm --swarm-master --swarm-discovery token://YOURTOKENHERE swarm-master
docker-machine create -d virtualbox --swarm --swarm-discovery token://YOURTOKENHERE swarm-agent-00
docker-machine create -d virtualbox --swarm --swarm-discovery token://YOURTOKENHERE swarm-agent-01
```

Point shell to master:
```
eval $(docker-machine env --swarm swarm-master)
```

## Connect nodes
```
docker-machine ssh swarm-master
docker swarm init --advertise-addr 192.168.99.112:2376
```
this will create a message to bind other nodes to master:
```
docker swarm join \
   --token SWMTKN-1-1o76kiyqzly3q1sil152vfl95avui8emv3idpzbolfwuteme0q-48tqjrg1ga2zth26kjhqkq8ry \
   192.168.99.112:2376
```

so, first exit from swarm master and then sequentially enter child nodes and input the given command:
```
exit
docker-machine ssh swarm-agent-00
docker swarm join \
   --token SWMTKN-1-1o76kiyqzly3q1sil152vfl95avui8emv3idpzbolfwuteme0q-48tqjrg1ga2zth26kjhqkq8ry \
   192.168.99.112:2376

exit
docker-machine ssh swarm-agent-01
....
```

### deploy to swarm
Then run any docker image in your docker agents, e.g:
```
docker run -d redis 0d7af2492be35cc9c7593f6d677185c6c44f3a06898258585c7d2d2f9aa03c2e
$ docker run -d nginx 0babf055abf9b487b6bafd4651386075f8d6f46ce9f192849bc32345997438ea
```
