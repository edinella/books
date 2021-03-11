.DEFAULT_GOAL:=help

##@ Services

.PHONY: all
all: check-env ## Start services
	tilt up;

check-env:
ifndef APP_KEY
	$(error APP_KEY is undefined)
endif

##@ Utility
TARGET_MAX_CHAR_NUM=16
FMT_COMMAND=\033[0;35m
FMT_TITLE=\n\033[1m
FMT_TARGET=\033[36m
FMT_RESET=\033[0m
FMT_GROUP=\033[0;34m
.PHONY: help
help: ## Show this help.
	@awk ' \
		BEGIN { \
			FS = ":.*##"; \
			printf "${FMT_TITLE}Usage:${FMT_RESET} \n  ${FMT_COMMAND}make ${FMT_TARGET}<target>${FMT_RESET}\n${FMT_TITLE}Targets:${FMT_RESET} \n" \
		} \
		/^[0-9a-zA-Z_ -]+:.*?##/ { \
			printf "    ${FMT_TARGET}%-$(TARGET_MAX_CHAR_NUM)s${FMT_RESET} %s\n", $$1, $$2 \
		} \
		/^##@/ { \
			printf "${FMT_GROUP}  %s${FMT_RESET}\n", substr($$0, 5) \
		} \
	' $(MAKEFILE_LIST)
