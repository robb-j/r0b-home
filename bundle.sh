#!/usr/bin/env bash

set -e

mkdir r0b

cp src/custom.css src/logic.js src/index.html r0b/

cp -R src/img r0b/
cp -RH src/design r0b/

tar -czvf r0b.tar.gz r0b

rm -R r0b
