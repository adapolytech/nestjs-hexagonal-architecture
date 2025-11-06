.DEFAULT_GOAL := build
VERSION := $(shell cat proxy.version)

NEW_PATH := $(if $(HOMEE),$(HOME),/home/ada)/nuulestdev

build:
	echo $(NEW_PATH)
deploy: build
	echo "Hello world"
start: deploy
	node --version
