
# indiaPay

command to build docker image for mongodb

`docker build ./ -t mongod:4.7-replset`


command to run docker image for mongodb

`docker run --name mongod-replset -p 27017:27017 mongod:4.7-replset`

TO RUN THE PROJECT

To run the backend of the project

1. run `cd backend`
2. run `npm start`
3.  it will be running on `http://localhost:5000`

To run the frontend of the project

1. run `cd frontend`
2. run `npm run dev`
3.  it will be running on `http://localhost:5173/`
