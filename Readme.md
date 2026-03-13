# Todo App – Secure Task Management API

A **secure Todo Management API** built using **Node.js, Express, and MongoDB**.
This project demonstrates **authentication, middleware protection, schema validation, and full CRUD operations** for managing user tasks.

The backend follows a **modular architecture** with separate folders for controllers, routes, middleware, schemas, and models to keep the codebase clean and scalable.

---

# Features

## Authentication System

* User Signup
* User Signin
* JWT Token Authentication
* Protected Routes using Middleware

## Todo Management

* Create Todo
* Fetch All Todos
* Update Todo
* Delete Todo

## Profile Management

* Get User Profile
* Edit User Profile

## Validation & Security

* Request validation using Zod
* Middleware based authentication
* Environment variable configuration

---

# Tech Stack

Backend

* Node.js
* Express.js
* MongoDB

Validation

* Zod Schema Validation

Authentication

* JSON Web Tokens (JWT)

Tools

* Postman for API testing
* Nodemon for development
* Git & GitHub for version control

---

# Project Structure

```text
TODO-APP
│
├── app/src
│   ├── config
│   │   └── config.js
│   │
│   ├── controller
│   │   ├── authcontroller.js
│   │   ├── todocontroller.js
│   │   └── usercontroller.js
│   │
│   ├── middleware
│   │   ├── middleware.js
│   │   └── error-middleware.js
│   │
│   ├── models
│   │   ├── todo.js
│   │   └── user.js
│   │
│   ├── public
│   │   ├── index.html
│   │   ├── style.css
│   │   └── index.js
│   │
│   ├── routes
│   │   └── route.js
│   │
│   └── schema
│       └── user.schema.js
│
├── .env
├── .env.example
├── .gitignore
│
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

---

# API Base URL

```
http://localhost:3000/api/v1/user
```

---

# Authentication Routes

## Signup

POST `/signup`

Request Body

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "Password123"
}
```

---

## Signin

POST `/signin`

Request Body

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "Password123"
}
```

Response

```json
{
  "token": "JWT_TOKEN"
}
```

This token must be used in **protected routes**.

---

# Profile Routes

## Get Profile

GET `/profile`

Headers

```
token: YOUR_JWT_TOKEN
```

---

## Edit Profile

PUT `/profile/edit/:id`

Headers

```
token: YOUR_JWT_TOKEN
```

---

# Todo Routes

All Todo routes require authentication.

---

## Create Todo

POST `/todo`

Headers

```
token: YOUR_JWT_TOKEN
```

Body

```json
{
  "title": "Learn Express.js"
}
```

---

## Get All Todos

GET `/todo`

Headers

```
token: YOUR_JWT_TOKEN
```

---

## Update Todo

PUT `/todo/:id`

Headers

```
token: YOUR_JWT_TOKEN
```

Body

```json
{
  "title": "Updated Todo"
}
```

---

## Delete Todo

DELETE `/todo/:id`

Headers

```
token: YOUR_JWT_TOKEN
```

---

# Validation

User input validation is implemented using **Zod**.

Validation schema example:

```javascript
const { z } = require("zod")

const protection = z.object({
  username: z.string().min(4).max(10),
  email: z.string().email().max(100),
  password: z.string().min(3).max(10)
})
```

This ensures only valid data is accepted by the API.

---

# Installation

Clone the repository

```
git clone https://github.com/yourusername/todo-app.git
```

Move into project folder

```
cd todo-app
```

Install dependencies

```
npm install
```

Create `.env` file

Example:

```

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start server

```
node index.js
```

Server will run at

```
http://localhost:3000
```

---

# API Testing

The API can be tested using:

* Postman
* Thunder Client
* URL

Basic testing flow:

1. Signup user
2. Signin to receive JWT token
3. Use token in headers
4. Perform Todo CRUD operations

---

# Future Improvements

* Swagger API documentation
* Todo priority system
* Deadlines for tasks
* Pagination for large todo lists
* Role-based authentication
* Making frontend 

---

# Author

Built by **NiravDongre**

Backend developer focused on **Node.js, Express, and scalable API development**.
