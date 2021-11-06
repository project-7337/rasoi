#!/bin/bash

set -e

if [ $# -lt 1 ]; then
  exit 1
fi

CUR_DIR=`pwd`
PROJECT_DIR=$CUR_DIR/..

export APP_ENV=prod
export REACT_APP_PUBLIC_URL=/enviro

cd "$PROJECT_DIR"
rm -rf node_modules
rm -rf yarn.lock
yarn install

cd client
rm -rf node_modules
rm -rf buid
rm -rf yarn.lock
yarn install
yarn run build
rm -rf node_modules

cd "$PROJECT_DIR"
docker build -t neo73/enviro.care:"$1" .

rm -rf node_modules