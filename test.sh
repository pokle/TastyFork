#!/usr/bin/env bash

coverage() {
  rm -rf lib-cov
  jscoverage --no-highlight lib lib-cov
  if [ $? == 0 ]; then
    NODE_PATH=lib-cov
  fi
}

export NODE_PATH=lib
coverage
expresso