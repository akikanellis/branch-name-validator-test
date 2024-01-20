<!-- markdownlint-disable MD041 -->

<div align="center">

# Developers Guide

[About](#about)
•
[Prerequisites](#prerequisites)
•
[Useful Commands](#useful-commands)

</div>

---

## About

This document describes setting up your development environment to build and
test this project.

## Prerequisites

Install the following software

- [Docker](https://www.docker.com/)
- [mise](https://github.com/jdx/mise)
- [Node](https://nodejs.org/)

## Useful Commands

Install tools and dependencies

```shell
npm install && npm run install:all
```

Lint project

```shell
npm run lint
```

Compile project

```shell
npm run build
```

Run tests

```shell
npm run test
```

Clean generated files

```shell
npm run clean
```
