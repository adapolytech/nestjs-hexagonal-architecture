DOCKER_IMAGE_NAME ?= hackaton_service
DOCKER_IMAGE_TAGNAME ?= latest
REPOSITORY_NAME := nuulestdev

build:
	docker build -t $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAGNAME) .

tag-remote:
	docker tag $(DOCKER_IMAGE_NAME):$(DOCKER_IMAGE_TAGNAME) $(REPOSITORY_NAME)/hackaton-service:$(DOCKER_IMAGE_TAGNAME)

push:
	docker push $(REPOSITORY_NAME)/hackaton-service:$(DOCKER_IMAGE_TAGNAME)
