cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t kristinnv12/tictactoe .