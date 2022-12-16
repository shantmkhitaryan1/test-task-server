[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

# Crowdfunding test-app

Express Js sample example based CRUD app

## Description

Used Prettier to make code cleaner and also used express-validator library to validate requests.

For database used **MYSQL** with **Sequelize**.

## Installation

```bash
npm install
```

## Running development mode

```bash
npm run dev
```

## Creating tables in database

```bash
npm run db-create-users
npm run db-create-compaigns
npm run db-create-donations
```
## Migrations

```bash
npm run migrate
```

## Seeding data in user table

```bash
npm run db-up
npm run db-down
```

## Routes

Starting point "localhost:8000"

**API**

 + Get all actice comapaigns - GET /api/compaign

 + Create compaign - POST /api/compaign

 + User sign-in - POST /api/auth/sign-in

 + Donations - POST /api/donate