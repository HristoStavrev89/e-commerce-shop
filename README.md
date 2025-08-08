<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>



## Description

This project also uses **Prisma** as an ORM and **Docker** to manage PostgreSQL and pgAdmin containers. A Docker volume ensures persistent data even after container restarts.

The project is created purely for **learning and training purposes**, with the goal of gaining hands-on experience in building modular and scalable backend systems.

### Key Features

- User authentication and management
- Product catalog with categories
- Shopping cart functionality
- Order creation and tracking
- Admin operations (e.g., product and category management)

The architecture follows best practices such as:
- Modular design using NestJS modules and dependency injection
- Database modeling with Prisma ORM
- Database containerization and persistence with Docker
- Clear separation of environments using environment variables

## Installation

```bash
$ npm install
```

## Run Prisma

```bash
# Generate Prisma Client from schema
npx prisma generate

# Apply schema and create tables in the database
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio in browser
npx prisma studio

```

## Run Docker and set up database connection

```bash
# Start Docker containers (PostgreSQL + pgAdmin)
docker-compose up -d

# Stop containers
docker-compose down

# Connection string
Creating a .env file with connection string for the database is also required.

```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


