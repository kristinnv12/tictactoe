#!/bin/bash

set -e

echo "running end to end tests"
xvfb-run grunt test:e2e --port=7000

echo "Done"
