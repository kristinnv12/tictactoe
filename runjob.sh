#!/bin/bash
uname -a
echo killing docker
docker kill tictactoe

echo removing docker
docker rm tictactoe

echo pulling docker
docker pull kristinnv12/tictactoe

echo running docker
docker run -p 80:8080 -d -e "NODE_ENV=production" --name="tictactoe" kristinnv12/tictactoe