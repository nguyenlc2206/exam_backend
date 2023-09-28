DOCKER_COMPOSE_FILE_DEV ?= docker-compose.dev.yml
DOCKER_COMPOSE_FILE_PROD ?= docker-compose.prod.yml

dev:
	docker-compose -f ${DOCKER_COMPOSE_FILE_DEV} up --build
prod:
	docker-compose -f ${DOCKER_COMPOSE_FILE_PROD} up --build

down-dev:
	docker-compose -f ${DOCKER_COMPOSE_FILE_DEV} down
down-dev-volume:
	docker-compose -f ${DOCKER_COMPOSE_FILE_DEV} down -v

down-prod:
	docker-compose -f ${DOCKER_COMPOSE_FILE_PROD} down
down-prod-volume:
	docker-compose -f ${DOCKER_COMPOSE_FILE_PROD} down -v
	
tests:
	yarn run test
	