PROJECT = sup
PROJECT_DIR = $(shell pwd)

CSS_SRC = css
CSS_BUILD = css
CSS_FINAL = $(CSS_BUILD)/$(PROJECT).build.css
CSS_TARGETS = bootstrap.css \
              site.css \
              site-responsive.css


JS_UI_LIB_SRC = js
JS_UI_BUILD = js
JS_UI_FINAL = $(JS_UI_BUILD)/$(PROJECT).build.js

UI_LIB_TARGETS =  jquery-1.9.1.min.js \
          jquery.tap.min.js \
          jquery.customSelect.min.js \
          site.js


install:
	npm install

version:
	@echo $(VERSION)

build-ui: 
	@mkdir -p $(JS_UI_BUILD)
	@for file in $(UI_LIB_TARGETS) ; do \
		cat $(addprefix $(JS_UI_LIB_SRC)/, $$file) ; \
		echo ; \
	done > $(JS_UI_FINAL)

	@mkdir -p $(CSS_BUILD)
	@for file in $(CSS_TARGETS) ; do \
		cat $(addprefix $(CSS_SRC)/, $$file) | sed -e "s/\@@STATICDOMAIN/$(STATIC_DOMAIN)/" ; \
	echo ; \
	done > $(CSS_FINAL)

min-js:
	@./node_modules/uglify-js/bin/uglifyjs -nc -o $(JS_UI_FINAL) $(JS_UI_FINAL)

min-css:

min: min-js min-css

build: build-ui min

clean:
	@rm -rf lib 

#all: install build test
all: install build


.PHONY: all 

