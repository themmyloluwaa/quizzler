#!/bin/bash

echo "Hello, welcome to docker prod build."
echo "Let's get started"


PROJECT_NAME=quizzler

printf "What's your docker username ?"

read -r DOCKER_USERNAME

echo "Great great"

printf "What would you like to tag your image ?"

read -r DOCKER_TAG

echo "Nice. Sit back and let me perform my magic"

docker build -t $DOCKER_USERNAME/$PROJECT_NAME:$DOCKER_TAG .

echo "Alright mate. My parts done, please run 'docker push $DOCKER_USERNAME/$PROJECT_NAME:$DOCKER_TAG' to push your newly built image to production"