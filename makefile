.DEFAULT_GOAL := build

# NEW_PATH := $(if $(HOMEE),$(HOME),/home/ada)/nuulestdev

build:
	echo $(PATH)
check_aws:
	aws --version
