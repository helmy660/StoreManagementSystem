# StoreManagementSystem

## Table of contents

- [StoreManagementSystem](#storemanagementsystem)
  - [Table of contents](#table-of-contents)
  - [General info](#general-info)
  - [Technologies](#technologies)
  - [Setup](#setup)

## General info

This is a store managment system hat will control all the store elements
(users – products – orders – cart)

## Technologies

Project is created with:

- node-js
- typescript
- express
- mongoDB

## Setup

To run this project, You will need first to create .env file and put into it the following data:

```
PORT=3003
ENVIRONMENT=development
DB_PASSWORD=PaHbCghLJIMTPCkI
DB_USER=helmy
DB_NAME=StoreSystem
JWT_SECRET_KEY=bdUPfsY6OOmyv8EN7K5YEowHZ2XaUWyR
JWT_EXPIRY=15m
CORS_WHITELIST='http://localhost:3000,*'
```

Then install dependecies locally using npm and start the server:

```
$ npm install
$ npm run build:live
```

To run docker:

```
$ docker-compose up --build -d
$ docker-compose logs -f
```
