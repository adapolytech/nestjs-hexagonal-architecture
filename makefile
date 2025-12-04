DOCKER_IMAGE_NAME ?= hackaton_service
DOCKER_IMAGE_TAGNAME ?= latest
REPOSITORY_NAME := nuulestdev
DOCKERHUB_USERNAME ?= nuulestdev

build:
	docker build -t $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAGNAME) .

tag-remote:
	docker tag $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAGNAME) $(REPOSITORY_NAME)/hackaton-service:$(DOCKER_IMAGE_TAGNAME)

login:
	docker login -u $(DOCKERHUB_USERNAME) -p $(DOCKERHUB_PASSWORD) registry.hub.docker.com

push: login
	docker push $(REPOSITORY_NAME)/hackaton-service:$(DOCKER_IMAGE_TAGNAME)
