#!/bin/bash

set -e

echo Cleaning...
rm -rf ./dist

echo Building app

echo bower install
bower install

echo Npm install
npm install

echo grunt install
npm install grunt

echo e2e
grunt test:e2e --port=7000