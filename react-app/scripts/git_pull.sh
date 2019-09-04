#!/bin/bash

cd ..
git pull
cd modules
for i in $( ls ); do
    echo Project Name: "$i"
    cd "$i"
    git pull
    cd ..
done