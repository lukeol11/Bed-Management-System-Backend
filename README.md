# Bed Management System Backend

[![build](https://github.com/lukeol11/Bed-Management-System-Backend/actions/workflows/build.yml/badge.svg)](https://github.com/lukeol11/Bed-Management-System-Backend/actions/workflows/build.yml)
[![GitHub issues](https://img.shields.io/github/issues/lukeol11/Bed-Management-System-Backend)](https://github.com/lukeol11/Bed-Management-System-Backend/issues)
![GitHub Created At](https://img.shields.io/github/created-at/lukeol11/Bed-Management-System-Backend?logo=github)
![GitHub last commit](https://img.shields.io/github/last-commit/lukeol11/Bed-Management-System-Backend?logo=github)
[![GitHub license](https://img.shields.io/github/license/lukeol11/Bed-Management-System-Backend?color=blue&logo=github)](https://github.com/lukeol11/Bed-Management-System-Backend/blob/master/LICENSE)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)

[![Nest.js](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en)
[![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)](https://swagger.io/)
[![SonarCloud](https://img.shields.io/badge/Sonar%20cloud-F3702A?style=for-the-badge&logo=sonarcloud&logoColor=white)](https://www.sonarsource.com/products/sonarcloud/)
[![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)](https://prettier.io/)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Running the app](#running-the-app)
  - [Database Configuration](#database-configuration)
  - [Nest Configuration](#nest-configuration)
  - [Swagger](#swagger)
  - [Frontend](#frontend)
- [Test](#test)
- [Contributors](#contributors)
- [License](#license)

## Description

## Installation

```bash
nvm use
```

```bash
npm install
```

## Running the app

### Database Configuration

The following MySQL database configuration is required to run the application:
[Database Configuration](database/schema.sql)

Create a `.env` file in the main directory with the database configuration.

**Sample Configuation:**

```bash
DB_HOST = ""
DB_PORT = 0000
DB_USERNAME = ""
DB_PASSWORD = ""
DB_NAME = ""
DB_SYNCHRONIZE = ""
```

### Run development build

```bash
# Database needs to be running before starting the application
npm run start
```

### Run production build

```bash
# Database needs to be running before starting the application
npm run start:prod
```

### Swagger

A swagger UI is available at `/api` after starting the application.

### Frontend

The Vue.js frontend for this project can be found [here](https://github.com/lukeol11/Bed-Management-System-Frontend)

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Contributors

![Contributors](https://contrib.rocks/image?repo=lukeol11/Bed-Management-System-Backend)

## License

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
