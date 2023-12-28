#!/usr/bin/env just --justfile

# renovate: datasource=npm depName=mega-linter-runner
mega_linter_runner_version := "7.6.0"
# renovate: datasource=docker depName=oxsecurity/megalinter
mega_linter_version := "v7.6.0"

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
  npx mega-linter-runner@{{mega_linter_runner_version}} \
  --release {{mega_linter_version}} \
  {{extra_args}}

# Run the tests
test:
  npm run test

# Clean generated files
clean:
  npm run clean
