set -e

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t kristinnv12/tictactoe .

echo pushing to docker
docker push kristinnv12/tictactoe

ssh root@5.101.98.8 'bash -s' < runjob.sh
