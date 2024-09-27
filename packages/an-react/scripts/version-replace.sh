#!/bin/bash

# Paths to the package.json files
CORE_PACKAGE_JSON="../an-core/package.json"
TARGET_PACKAGE_JSON="./package.json"

# Extract the version from the core package.json
CORE_VERSION=$(grep '"version"' $CORE_PACKAGE_JSON | sed -E 's/.*"version": "(.*)".*/\1/')

# Add ^ to the version
CORE_VERSION="^$CORE_VERSION"

# Replace the version in the target package.json
sed -i '' -E "s/\"@arrow-navigation\/core\": \".*\"/\"@arrow-navigation\/core\": \"$CORE_VERSION\"/" $TARGET_PACKAGE_JSON

echo "Replaced @arrow-navigation/core version with $CORE_VERSION in $TARGET_PACKAGE_JSON"