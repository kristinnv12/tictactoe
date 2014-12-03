#!/bin/bash

set -e

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t kristinnv12/tictactoe .

echo pushing to docker
docker push kristinnv12/tictactoe

ls -al

ssh root@95.85.17.171 'bash -s' < runjob.sh