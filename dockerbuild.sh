#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app

echo bower install
bower install

echo Npm install
npm install

echo grunt install
npm install grunt

echo grunt run

echo "Done"
