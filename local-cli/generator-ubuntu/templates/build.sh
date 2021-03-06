#!/bin/bash

# Copyright (C) 2016, Canonical Ltd.
# All rights reserved.

# This source code is licensed under the BSD-style license found in the
# LICENSE file in the root directory of this source tree. An additional grant
# of patent rights can be found in the PATENTS file in the same directory.


(mkdir $(dirname $0)/build) && (echo "make dir build")

# XXX: Don't move this script
# cd $(dirname $0)/build

# Workaround
# rm -rf CMakeFiles CMakeCache.txt cmake_install.cmake Makefile

# Build project
cd $(dirname $0)/build && cmake .. && make -j4 && cp ./bin/<%= name %> ../click/


