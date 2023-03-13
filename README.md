## NestJS + Mysql + Prisma + Passport JWT (N3P Stack)

[Nest](https://github.com/nestjs/nest) framework TypeScript scaffold.

1. NestJS 9
2. Mysql (Docker)
3. Prisma ORM
4. Passport JWT

## Installation

```bash
$ yarn
```

## Running the app

```bash
# Start db
$ yarn db:up

# Run prisma migration (with existing migration)
$ npx prisma migrate deploy

# Run prisma migration (if using different migration)
$ npx prisma migrate dev

# Dev watch
$ yarn start:dev

# production mode
$ yarn start:prod
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

## recorrd

1. use code first

2. swagger APi && graphQl

3. INestApplication && INestMicroService

4. Hybrid application

5. rpc服务提供方和调用方
- consumer.controller
- app.controller