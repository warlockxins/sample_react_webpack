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

see its source here:
```
version: "3"

services:

  proxy:
    image: vfarcic/docker-flow-proxy
    ports:
      - 80:80
      - 443:443
    networks:
      - proxy
    environment:
      - LISTENER_ADDRESS=swarm-listener
      - MODE=swarm
    deploy:
      replicas: 2

  swarm-listener:
    image: vfarcic/docker-flow-swarm-listener
    networks:
      - proxy
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - DF_NOTIFY_CREATE_SERVICE_URL=http://proxy:8080/v1/docker-flow-proxy/reconfigure
      - DF_NOTIFY_REMOVE_SERVICE_URL=http://proxy:8080/v1/docker-flow-proxy/remove
    deploy:
      placement:
        constraints: [node.role == manager]

networks:
  proxy:
    external: true
```



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
```
curl -o docker-compose-app-stack.yml \
  https://raw.githubusercontent.com/warlockxins/sample_react_webpack/master/docker-compose-app-stack.yml
```

then deploy:
```
docker stack deploy \
>     -c docker-compose-app-stack.yml diatom_demo
```

then you can observe that the app was deployed to several nodes ;)
```
  docker stack ps diatom_demo
```
see the output:
```
ID                  NAME                 IMAGE                                   NODE                DESIRED STATE       CURRENT STATE              ERROR               PORTS
6ipyksu9j8w2        diatom_demo_db.1     mongo:latest                            node-1              Running             Running 16 seconds ago                         
d7liw7dr5xj3        diatom_demo_main.1   warlockxins/docker_diatom_test:latest   node-2              Running             Preparing 18 seconds ago                       
iw8wgbzlyjql        diatom_demo_main.2   warlockxins/docker_diatom_test:latest   node-3              Running             Preparing 18 seconds ago                       
0oumjys5xpgl        diatom_demo_main.3   warlockxins/docker_diatom_test:latest   node-1              Running             Preparing 18 seconds ago                       
```

# Cleanup
After done using nodes, just remove them
```
// exit node-1
exit

docker-machine rm -f node-1 node-2 node-3
```

#### Documentation
Reference https://docs.docker.com/engine/reference/commandline/stack_services/#extended-description for better understanding
