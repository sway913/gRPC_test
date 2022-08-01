#!/usr/bin/env bash

WORK_DIR=$(cd $(dirname $0); pwd)

export MY_INSTALL_DIR=${WORK_DIR}/out_grpc
mkdir -p $MY_INSTALL_DIR


export PATH="$MY_INSTALL_DIR/bin:$PATH"

#sudo apt-get install -y build-essential autoconf libtool pkg-config

#git clone --recurse-submodules -b v1.46.4 https://github.com/grpc/grpc

export PKG_CONFIG_PATH=/home/qh/work/edit_sdk_web/editorSDK/third_party/libs/Linux/x86_64/lib/pkgconfig

cd ${WORK_DIR}/grpc

mkdir -p cmake/build
pushd cmake/build

#ssl and zlib build you or system
export PKG_CONFIG_PATH=/usr/lib/x86_64-linux-gnu/pkgconfig/:${PKG_CONFIG_PATH}

cmake -DgRPC_INSTALL=ON \
      -DCMAKE_BUILD_TYPE=Release \
      -DgRPC_BUILD_TESTS=OFF \
      -DBUILD_SHARED_LIBS=OFF \
      -DgRPC_SSL_PROVIDER=package \
      -DgRPC_ZLIB_PROVIDER=package \
      -DCMAKE_INSTALL_PREFIX=$MY_INSTALL_DIR \
      ../..
make -j6
make install

popd
