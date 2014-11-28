#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
bower install
npm install
grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t kristinnv12/tictactoe .

echo "Done"
