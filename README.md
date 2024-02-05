
## Build a basic version of PayTM

command to build docker image for mongodb

`docker build ./ -t mongod:4.7-replset`


command to run docker image for mongodb

`docker run --name mongod-replset -p 27017:27017 mongod:4.7-replset`