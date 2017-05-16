# Docker Stack

Helper methods to automize docker swarm machine/node creation
Setum *docker-machines* by
```
curl -o swarm-cluster.sh \
    https://raw.githubusercontent.com/vfarcic/docker-flow-proxy/master/scripts/swarm-cluster.sh
//then
chmod +x swarm-cluster.sh  
 ./swarm-cluster.sh

 docker network create --driver overlay proxy
```

then use https://github.com/vfarcic/docker-flow-proxy to configure proxy and swarm listener files - "yml", like this

```
curl -o docker-compose-stack.yml \
    https://raw.githubusercontent.com/vfarcic/docker-flow-proxy/master/docker-compose-stack.yml

docker stack deploy -c docker-compose-stack.yml proxy
```

The first command downloaded the Compose file docker-compose-stack.yml from the vfarcic/docker-flow-proxy repository. The second command created the services that form the stack.

The tasks of the stack can be seen through the stack ps command.
```
docker stack ps proxy
```
we get:
```
NAME                   IMAGE                                     NODE   DESIRED STATE CURRENT STATE         ERROR  PORTS
proxy_proxy.1          vfarcic/docker-flow-proxy:latest          node-2 Running       Running 2 minutes ago
proxy_swarm-listener.1 vfarcic/docker-flow-swarm-listener:latest node-1 Running       Running 2 minutes ago
proxy_proxy.2          vfarcic/docker-flow-proxy:latest          node-3 Running       Running 2 minutes ago
```

We are running two replicas of the proxy (for high-availability in the case of a failure) and one of the swarm-listener.

Now we can deploy our APP:

# Deploy app stack
