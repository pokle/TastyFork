#!/usr/bin/env bash

PATH="./node_modules/.bin/:$PATH"


coverage() {
  rm -rf lib-cov
  node-jscoverage lib lib-cov &&
    export NODE_PATH=lib-cov
}

export NODE_PATH=lib
coverage
expresso
