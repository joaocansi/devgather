#!/bin/bash

# Navigate to devgather-client directory and start the client
cd ./devgather-client
yarn dev &

# Navigate to devgather-server directory and start the server
cd ./../devgather-server
yarn start:dev &

# Wait for both processes to finish
wait
