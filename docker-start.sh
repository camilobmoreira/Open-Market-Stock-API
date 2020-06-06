# Builds the Dockerfile in current directory
docker build -t open-stock-market-api-image .

docker run \
    --name open-stock-market-api \
    -p 80:3000 \
    -e NODE_ENV=development \
    -d \
    open-stock-market-api-image

function out {
	docker rm -f open-stock-market-api
	exit
}
trap "out" SIGINT SIGTERM

docker logs --follow open-stock-market-api