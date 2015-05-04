#!/bin/bash

#clean up
rm -rf dist

#mkdir
mkdir dist
mkdir dist/apply
mkdir dist/avatar

#cp
cp application dist -r
cp static dist -r
cp system dist -r

#filter
find dist -name "*.coffee" -exec rm -fv {} \;
find dist -name "*.less" -exec rm -fv {} \;
find dist -name "*.jade" -exec rm -fv {} \;
find dist -name "*.json" -exec rm -fv {} \;
