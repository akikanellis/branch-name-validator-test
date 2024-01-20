#!/usr/bin/env just --justfile

# renovate: datasource=npm depName=mega-linter-runner
mega_linter_runner_version := "7.7.0"

# renovate: datasource=docker depName=oxsecurity/megalinter
mega_linter_version := "v7.7.0@sha256:d64e6775ffac5543417134a96f70d26a0bd76d82944374880763efc5d4f11a98"

# Lint project
lint *extra_args:
  npx mega-linter-runner@{{mega_linter_runner_version}} \
  --release {{mega_linter_version}} \
  {{extra_args}}

# Run the tests
test:
  npm run test

# Clean generated files
clean:
  npm run clean
