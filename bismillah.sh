#!/bin/bash

PROJECT_DIR="grails-engine"
echo "Cloning Project from GitHub"
git clone --branch new-structure https://github.com/hmtmcse/grails786.git "$PROJECT_DIR"
cd "$PROJECT_DIR"

echo "Resolving Project Dependency"
bash gradlew resolveDependencies

echo "Installing React Material App (RMA) Dependency"
yarn install