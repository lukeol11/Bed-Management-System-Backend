# Bed Management System Backend

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)

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

Create a .env file in the main directory with the database configuration.

**Sample Configuation:**

```bash
DB_HOST = ""
DB_PORT = 0000
DB_USERNAME = ""
DB_PASSWORD = ""
DB_NAME = ""
DB_SYNCHRONIZE = ""
```

### Nest Configuration

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

### Swagger

A swagger UI is available on at `/api` after starting the application.

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
