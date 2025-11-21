#!/bin/bash
# Patch contentlayer generated files to use 'with' instead of 'assert' for JSON imports
# This is needed for Node.js 24+ compatibility

if [ -d ".contentlayer" ]; then
  find .contentlayer -name "*.mjs" -type f -exec sed -i "s/assert { type: 'json' }/with { type: 'json' }/g" {} \;
  echo "Patched contentlayer files to use 'with' syntax"
fi
