[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

# Crowdfunding app

Express Js Crowdfunding test application 

## Description

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

 + Fraud Compaign - GET /api/fraud

 ## Users credentials

 username-test1, password-12345
 username-test2, password-123456
 username-test3, password-1234567
 username-test4, password-12345678
