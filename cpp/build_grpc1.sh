#!/usr/bin/env bash

WORK_DIR=$(cd $(dirname $0); pwd)

export MY_INSTALL_DIR=${WORK_DIR}/out_grpc
mkdir -p $MY_INSTALL_DIR


export PATH="$MY_INSTALL_DIR/bin:$PATH"

#sudo apt-get install -y build-essential autoconf libtool pkg-config

#git clone --recurse-submodules -b v1.46.4 https://github.com/grpc/grpc

export PKG_CONFIG_PATH=/usr/lib/x86_64-linux-gnu/pkgconfig

cd ${WORK_DIR}/grpc

mkdir -p cmake/build
pushd cmake/build

#ssl use system

cmake -DgRPC_INSTALL=ON \
      -DCMAKE_BUILD_TYPE=Release \
      -DgRPC_BUILD_TESTS=OFF \
      -DBUILD_SHARED_LIBS=OFF \
      -DCMAKE_INSTALL_PREFIX=$MY_INSTALL_DIR \
      ../..
make -j6
make install

popd
