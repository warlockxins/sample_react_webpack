# Building the app
In this example we will create Docker image which runs *Node.js* application.

To build the app, in terminal do:
```
cd PATH_TO_APP/
docker build -t diatom:node_tests .
```

After this, to see existing docker images on local machine:
```
docker images
```

You should see respective image name.

REPOSITORY | TAG | IMAGE ID | etc
--- | --- | --- | ---
*diatom* | node_tests | b35fc7oo... | ... |

# Running the app

Running your image with -d runs the container in detached mode, leaving the container running in the background. The -p flag redirects a public port to a private port inside the container. Run the image you previously built:

```
docker run -p 49160:8080 -d diatom:node_tests
```
When running, to see active Docker images, run ``docker ps`` in terminal. You will see:

CONTAINER ID | IMAGE | COMMAND |  etc...
--- |  --- |  --- | ---
| *e0137fa4...* | diatom:node_tests | node index | ... |

If you have logs in your server `*.js` files, you can view them by:
```
docker logs <container id>
```

In this particular case, you will be able to access Node.js web page at:
*http://localhost:49160/* Notice the previosly mapped port 49160/


If you don't expose ports for container (`e.g. -p 49160:8080` in docker run command), check default assigned port by:
```
docker port <container id/name>
```
Then run `localhost: <given_port>` in browser ;)

To stop the docker process/container do:
```
docker stop <container id>
```
# Run error

When building and running frequently, you might encounter:
```
docker run -p 49160:8080 -d diatom:node_tests
4f3eb8c322b8587faa4181fda3cf6a435be300fa73be104a1c76ac3bff01cf10
docker: Error response from daemon: driver failed programming external connectivity on endpoint brave_wilson (f283456ad8437f452466b45160324970339d76490c979caab70fc1a3ad8aba08): Bind for 0.0.0.0:49160 failed: port is already allocated.
```

You will need to kill running images:
```
docker ps
//copy presented container id
docker kill <container id>

// kill all docker containers
docker kill $(docker ps -q)
```

Then `docker run...` again.

# Remove unnecessary images and containers

When constantly building containers, they clutter the memory. You will need to remove them your self. First run:
```
docker ps -a
```
This will give you a list of all containers (IDs). Then remove containers by providing a space separated list:
```
docker rm <container [id]>
```

For example:
```
docker rm 3cda9324fcf8 bdd0e918155a
```

or if you want to remove all containers, which are stopped:
```
docker rm $(docker ps -a -q -f status=exited)
```
This command deletes all containers that have a status of exited. In case you're wondering, the -q flag, only returns the numeric IDs and -f filters output based on conditions provided. One last thing that'll be useful is the --rm flag that can be passed to docker run which automatically deletes the container once it's exited from. For one off docker runs, --rm flag is very useful.

## And similar to images
```
# Delete all images
docker rmi $(docker images -q)
```

*This setup is built using online resources:*
1. https://docs.docker.com/edge/engine/reference/commandline/docker/
2. https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
3. http://dapperdeveloper.com/2016/05/18/developing-with-docker-and-webpack/
4. https://prakhar.me/docker-curriculum/
5. https://techoverflow.net/2013/10/22/docker-remove-all-images-and-containers/
6. https://docs.docker.com/engine/swarm/how-swarm-mode-works/nodes/#manager-nodes
