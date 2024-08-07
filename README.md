# [Bed Management System Backend](https://github.com/lukeol11/Bed-Management-System-Backend)

[![build](https://github.com/lukeol11/Bed-Management-System-Backend/actions/workflows/build.yml/badge.svg)](https://github.com/lukeol11/Bed-Management-System-Backend/actions/workflows/build.yml)
[![test](https://github.com/lukeol11/Bed-Management-System-Backend/actions/workflows/test.yml/badge.svg)](https://github.com/lukeol11/Bed-Management-System-Backend/actions/workflows/test.yml)
[![analysis](https://github.com/lukeol11/Bed-Management-System-Backend/actions/workflows/analysis.yml/badge.svg)](https://github.com/lukeol11/Bed-Management-System-Backend/actions/workflows/analysis.yml)
[![GitHub issues](https://img.shields.io/github/issues/lukeol11/Bed-Management-System-Backend)](https://github.com/lukeol11/Bed-Management-System-Backend/issues)
![GitHub Created At](https://img.shields.io/github/created-at/lukeol11/Bed-Management-System-Backend?logo=github)
![GitHub last commit](https://img.shields.io/github/last-commit/lukeol11/Bed-Management-System-Backend?logo=github)
[![GitHub contributors](https://img.shields.io/github/contributors/lukeol11/Bed-Management-System-Backend.svg?logo=github)](https://github.com/lukeol11/Bed-Management-System-Backend/graphs/contributors/)
[![GitHub license](https://img.shields.io/github/license/lukeol11/Bed-Management-System-Backend?color=blue&logo=github)](https://github.com/lukeol11/Bed-Management-System-Backend/blob/master/LICENSE)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=lukeol11_Bed-Management-System-Backend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=lukeol11_Bed-Management-System-Backend)

## Table of Contents

- [Description](#description)
  - [Technology Stack](#technology-stack)
  - [Features](#features)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [Run Docker Compose](#run-docker-compose)
- [Endpoints](#endpoints)
- [Test](#test)
- [Contributors](#contributors)
- [License](#license)

## Description

This software, aims to address the critical challenge of optimising hospital resource management, focusing on the effective allocation and utilisation on hospital beds.

There are many roles involved with efficient bed management including

- Doctors
- Nurses
- Bed Manages
- IT Administrators
- Cleaners

this results in bed management systems having may feature requirements including

- Bed Assignment
- Patient Transfers
- Bed Status Tracking
- Real-time Dashboard
- Updatable Wards & Beds
- Cross-platform Compatibility
- User-friendly Design

The motivation for this project comes from the hospital bed shortage faced in Ireland. The increasing wait times have resulted in more patients on trolleys; making them susceptible to infection and potential poor outcome. Efficient bed management can potentially help reduce waiting times by speeding up the bed allocation process.

Through careful research of existing literature and practices, some key design choices and features were made. For example, to eliminate the potential of typos, QR codes can be used to access all information and actions for a specific bed.

The System aims to meet the complex requirements of hospital bed management using a web application. Automating the bed management process can have huge impacts resulting in

- Saving staff time
- Improved patient care
- Cost savings through optimisation

### Technology Stack

[![Nest.js](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en)
[![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)](https://swagger.io/)
[![SonarCloud](https://img.shields.io/badge/Sonar%20cloud-F3702A?style=for-the-badge&logo=sonarcloud&logoColor=white)](https://www.sonarsource.com/products/sonarcloud/)
[![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)](https://prettier.io/)

### Features

- [Real-time dashboard](#real-time-dashboard)
- [Bed assignment](#bed-assignment)
- [Bed status tracking](#bed-status-tracking)
- [Patient transfers](#patient-transfers)
- [User management](#user-management)
- [Ward & bed management](#ward--bed-management)
- [QR code navigation](#qr-code-navigation)
- [Bed cleaning management](#bed-cleaning-management)
- [Unique user roles](#unique-user-roles)
- [Firebase authentication](#firebase-authentication)

#### Real-time dashboard

![Dashboard](/docs/images/Dashboard.png)

The dashboard provides a real-time overview of the hospital's bed occupancy and navigation to the different features of the system.

#### Bed assignment

![Bed Assignment](/docs/images/Bed%20Assignment.png)

The bed assignment feature allows doctors and nurses to assign a patient to a bed by inputting their details which shows all available beds that meet the patients requirements (Gender & Age).

#### Bed Status Tracking

![Bed Status](/docs/images/Bed%20Status.png)

The bed status page seen in the above figure shows the status of a given bed and the patient information if occupied. The bed status is updated in real-time.

#### Patient Transfers

![Patient Transfer](/docs/images/Patient%20Transfer.png)

The patient transfer screen allows users to request a transfer for a patient to another bed in the same or different hospital. The request can then only be approved by the bed manager where the patient is being transferred to.

#### User Management

![Manage Users](/docs/images/Manage%20Users.png)

The user management page allows administrators to create and delete user accounts. The page also allows administrators to assign roles to users. After entering the details of a new users, a pop-up will appear to enter a password for the new user.

#### Ward & Bed Management

![Manage Wards & Beds](/docs/images/Manage%20Beds.png)

The ward and bed management page allows administrators to create and delete wards and beds.

#### QR code navigation

![QR Code](/docs/images/QR%20code.png)

QR codes similar to the one above are generated for every bed in the hospital. These QR codes can be scanned to navigate to the bed status page for that bed.

#### Bed Cleaning Management

![Cleaning Required Tag](/docs/images/Cleaning%20Required%20Tag.png)

![Mark as Cleaned button](/docs/images/Mark%20as%20cleaned%20button.png)

When a patient is discharged from a bed, the bed is marked as requiring cleaning. Once cleaned the bed can then be marked as available for a new patient.

#### Unique User Roles

| Features                         | Doctors & Nurses | Bed Managers | Administrators |
| -------------------------------- | ---------------- | ------------ | -------------- |
| Assign/Unassign Patients to Beds | ✔️               | ✔️           | ✔️             |
| Search for Patients              | ✔️               | ✔️           | ✔️             |
| Make Transfer Requests           | ✔️               | ✔️           | ✔️             |
| Approve Transfer Requests        | ❌               | ✔️           | ❌             |
| Create/Update User Accounts      | ❌               | ❌           | ✔️             |
| Create/Update Wards & Beds       | ❌               | ❌           | ✔️             |

#### Firebase Authentication

![Login Form](/docs/images/Login%20Component.png)

Firebase Authentication is used to authenticate users. The system has three user roles: Doctors & Nurses, Bed Managers, and Administrators. Each user role has different permissions.

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

### Information for contributors

#### Code Formatter

For code formatting we use [Prettier](https://prettier.io/). Please use this to format your code so that the codebase remains consistent.

#### Style Guide

For the style guide we use [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/blob/master/README.md). Please follow this guide when writing code.

#### Code Analysis

For code analysis we use [SonarCloud](https://sonarcloud.io/). Please ensure that your code does not have any bugs, vulnerabilities, code smells, or security issues. This analysis will automatically run on every pull request. A failed analysis will prevent the pull request from being merged with the main branch.

#### Commit Messages & Branch Naming

Commit messages should be in the following format:

```
<type>: <description>
```

Branch names should be in the following format:

```
<type>/<description>
```

Where `<type>` is one of the following:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding or updating tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Swagger

A swagger UI is available at `/api` after starting the application.

### Frontend

The Vue.js frontend for this project can be found [here](https://github.com/lukeol11/Bed-Management-System-Frontend)

## Run Docker Compose

1. Build the Application:
   To build the application using Docker Compose, run the following command:

   ```bash
   docker-compose build
   ```

2. Create Network (if not already created):
   If you have not already created the bms-network network, run:

   ```bash
   docker network create bms-network
   ```

3. Start the Application:
   To start the application, run:

   ```bash
   docker-compose up
   ```

4. Start the Frontend Docker Compose:

   Start the Docker Compose for the Frontend as documented [here](https://github.com/lukeol11/Bed-Management-System-Frontend#Docker)

## Endpoints

### Users

| Method                                                                                    | Endpoint               |
| ----------------------------------------------------------------------------------------- | ---------------------- |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/users/all         |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/users/find        |
| ![POST](https://img.shields.io/badge/POST-POST?style=for-the-badge&color=%2349cc90)       | /api/users/create      |
| ![DELETE](https://img.shields.io/badge/DELETE-DELETE?style=for-the-badge&color=%23f93e3e) | /api/users/delete/{id} |

### Wards

| Method                                                                                    | Endpoint                    |
| ----------------------------------------------------------------------------------------- | --------------------------- |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/wards/all              |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/wards/treatment_levels |
| ![POST](https://img.shields.io/badge/POST-POST?style=for-the-badge&color=%2349cc90)       | /api/wards/create           |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/wards/find             |
| ![PATCH](https://img.shields.io/badge/PATCH-PATCH?style=for-the-badge&color=%2350e3c2)    | /api/wards/update/{id}      |
| ![DELETE](https://img.shields.io/badge/DELETE-DELETE?style=for-the-badge&color=%23f93e3e) | /api/wards/delete/{id}      |

### Patients

| Method                                                                                    | Endpoint                  |
| ----------------------------------------------------------------------------------------- | ------------------------- |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/patients/all         |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/patients/find        |
| ![DELETE](https://img.shields.io/badge/DELETE-DELETE?style=for-the-badge&color=%23f93e3e) | /api/patients/delete/{id} |
| ![PATCH](https://img.shields.io/badge/PATCH-PATCH?style=for-the-badge&color=%2350e3c2)    | /api/patients/update/{id} |
| ![POST](https://img.shields.io/badge/POST-POST?style=for-the-badge&color=%2349cc90)       | /api/patients/create      |

### Hospitals

| Method                                                                           | Endpoint            |
| -------------------------------------------------------------------------------- | ------------------- |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe) | /api/hospitals/all  |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe) | /api/hospitals/find |

### Beds

| Method                                                                                    | Endpoint                       |
| ----------------------------------------------------------------------------------------- | ------------------------------ |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/beds/statuses             |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/beds/all/{ward_id}        |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/beds/find/{bed_id}        |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/beds/find/{bed_id}/active |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/beds/find/{bed_id}/status |
| ![DELETE](https://img.shields.io/badge/DELETE-DELETE?style=for-the-badge&color=%23f93e3e) | /api/beds/delete/{bed_id}      |
| ![POST](https://img.shields.io/badge/POST-POST?style=for-the-badge&color=%2349cc90)       | /api/beds/occupancy            |
| ![PATCH](https://img.shields.io/badge/PATCH-PATCH?style=for-the-badge&color=%2350e3c2)    | /api/beds/disable/{bed_id}     |
| ![PATCH](https://img.shields.io/badge/PATCH-PATCH?style=for-the-badge&color=%2350e3c2)    | /api/beds/enable/{bed_id}      |
| ![POST](https://img.shields.io/badge/POST-POST?style=for-the-badge&color=%2349cc90)       | /api/beds/create               |
| ![POST](https://img.shields.io/badge/POST-POST?style=for-the-badge&color=%2349cc90)       | /api/beds/checkout             |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/beds/disabled_reasons     |

### Transfers

| Method                                                                                    | Endpoint                       |
| ----------------------------------------------------------------------------------------- | ------------------------------ |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/transfers/all             |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/transfers/find/patient_id |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/transfers/find/created_by |
| ![POST](https://img.shields.io/badge/POST-POST?style=for-the-badge&color=%2349cc90)       | /api/transfers/create          |
| ![POST](https://img.shields.io/badge/POST-POST?style=for-the-badge&color=%2349cc90)       | /api/transfers/approve         |
| ![DELETE](https://img.shields.io/badge/DELETE-DELETE?style=for-the-badge&color=%23f93e3e) | /api/transfers/delete/{id}     |

### Routing History

| Method                                                                              | Endpoint                  |
| ----------------------------------------------------------------------------------- | ------------------------- |
| ![POST](https://img.shields.io/badge/POST-POST?style=for-the-badge&color=%2349cc90) | /api/routing-history/add  |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)    | /api/routing-history/find |

### Rooms

| Method                                                                                    | Endpoint               |
| ----------------------------------------------------------------------------------------- | ---------------------- |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/rooms/all         |
| ![GET](https://img.shields.io/badge/GET-GET?style=for-the-badge&color=%2361affe)          | /api/rooms/find        |
| ![DELETE](https://img.shields.io/badge/DELETE-DELETE?style=for-the-badge&color=%23f93e3e) | /api/rooms/delete/{id} |
| ![POST](https://img.shields.io/badge/POST-POST?style=for-the-badge&color=%2349cc90)       | /api/rooms/create      |

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov

# artillery load test
artillery run artillery.yaml
```

## Contributors

![Contributors](https://contrib.rocks/image?repo=lukeol11/Bed-Management-System-Backend)

## License

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
