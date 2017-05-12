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
