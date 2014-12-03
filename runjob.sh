echo killing docker
docker kill $(docker ps -q)

echo removing docker
docker rm $(docker ps -a -q)

echo pulling docker
docker pull kristinnv12/tictactoe

echo running docker
docker run -p 80:8080 -d -e "NODE_ENV=production" kristinnv12/tictactoe