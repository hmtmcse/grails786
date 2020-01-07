#!/bin/bash

git clone --branch new-structure https://github.com/hmtmcse/grails786.git grails-engine
bash gradlew resolveDependencies
yarn install