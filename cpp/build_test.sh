#!/usr/bin/env bash

WORK_DIR=$(cd $(dirname $0); pwd)

export MY_INSTALL_DIR=${WORK_DIR}/out_grpc

export PKG_CONFIG_PATH=${MY_INSTALL_DIR}/lib/pkgconfig/:$PKG_CONFIG_PATH

# cd grpc/examples/cpp/helloworld
cd ${WORK_DIR}/helloworld

mkdir -p cmake/build
pushd cmake/build

cmake -DCMAKE_PREFIX_PATH=$MY_INSTALL_DIR ../..
make -j4


