#!/bin/bash

set -e

Xvfb -ac :99 -screen 0 1280x1024x16 &
export DISPLAY=:99 

echo e2e
grunt test:e2e --port=7000

echo "Done"