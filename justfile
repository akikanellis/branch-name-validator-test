#!/usr/bin/env just --justfile

super_linter_version := "slim-v5.7.2"

@_default:
  just --list

# Install tools and dependencies
install: install-tools install-dependencies

# Install tools
install-tools:
  asdf install

# Install dependencies
install-dependencies:
  npm install

# Lint project
lint *extra_args:
  docker run \
  --env RUN_LOCAL=true \
  --env DEFAULT_BRANCH=main \
  --env IGNORE_GENERATED_FILES=true \
  --env IGNORE_GITIGNORED_FILES=true \
  --env JAVASCRIPT_DEFAULT_STYLE=prettier \
  --env TYPESCRIPT_DEFAULT_STYLE=prettier \
  --env YAML_ERROR_ON_WARNING=true \
  --volume {{justfile_directory()}}:/tmp/lint \
  {{extra_args}} \
  ghcr.io/super-linter/super-linter:{{super_linter_version}}

# Run the tests
test:
  npm run test

# Clean generated files
clean:
  npm run clean
