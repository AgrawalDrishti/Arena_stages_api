<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
   
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Project setup

```bash
$ npm install
```

## Postgres setup
If PostgreSQL is not installed, download it from the https://www.postgresql.org/download/ and follow the installation instructions for your operating system.

#### 1. During installation:
Set a username and password for the PostgreSQL superuser (e.g., postgres).

#### 2. Start the PostgreSQL Service
On Linux : 
```bash
  $ sudo systemctl start postgresql
```

On windows : 

Use the "pgAdmin" app or start the PostgreSQL service from the services panel.

#### 3. Database creation
If you want to create a new database:

Log in to psql and then run the following commands:

```bash 
CREATE DATABASE my_database;
\q
```

#### 4. Adjust the connection string 
``` bash
postgres://postgres:mysecurepassword@localhost:5432/my_database
```
1. postgres: Default username.
2. mysecurepassword: Password you set during installation.
3. localhost: Database is running on the local machine.
4. 5432: Default PostgreSQL port.
5. my_database: The database you created or want to connect to.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Run frontend on : 
```bash
http://localhost:3001
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="./public/frontend-img.png" width="" alt="Nest Logo" /></a>
</p>



