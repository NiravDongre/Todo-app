# 🚀 Production-Ready Task API with Secure Authentication

A clean, production-ready backend for a Todo application built with a strong focus on **simplicity, security, and reliability**.

---

## ✨ Overview

This project is a **RESTful API** that allows users to:

* Register and log in securely
* Manage their personal todos (create, read, update, delete)
* Access only their own data

Despite being simple to use, the system is designed with **real-world backend practices**.

---

## 🌐 Repository

👉 [https://github.com/NiravDongre/Todo-app.git](https://github.com/NiravDongre/Todo-app.git)

---

## 🔐 Security First

Security is built into the core:

* **JWT Authentication** (Access + Refresh Tokens)
* **Refresh Token Rotation** (secure session lifecycle)
* **Password hashing** using bcrypt
* **Rate limiting** to prevent abuse
* **MongoDB sanitization** to avoid injection attacks
* **Helmet** for secure HTTP headers
* **Protected routes** (user-specific access only)

---

## ⚡ Key Features

* ✅ User Signup & Login
* ✅ JWT-based Authentication
* ✅ Refresh & Logout system
* ✅ CRUD Operations on Todos
* ✅ Pagination for scalable data fetching
* ✅ Profile management
* ✅ Global Error Handling
* ✅ Input Validation using Zod

---

## 🧱 Project Structure

```
app/src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── validations/
```

✔ Modular
✔ Scalable
✔ Maintainable

---

## 🔑 Authentication Flow (Simple & Secure)

1. User logs in → receives:

   * Access Token (short-lived)
   * Refresh Token (long-lived)

2. Access Token is used for protected routes

3. When expired → Refresh Token generates new tokens

4. Refresh Token is rotated for better security

5. Logout invalidates session

---

## 📡 API Endpoints

### 🔐 Auth

* `POST /api/v1/auth/signup`
* `POST /api/v1/auth/signin`
* `POST /api/v1/auth/refresh`
* `POST /api/v1/auth/logout`

### 📝 Todos (Protected)

* `POST /api/v1/todo/add` → Create todo
* `GET /api/v1/todo/todos` → Get all todos (pagination)
* `PUT /api/v1/todo/todos/:id` → Update todo
* `DELETE /api/v1/todo/todos/:id` → Delete todo

### 👤 User (Protected)

* `GET /api/v1/user/profile` → Get profile
* `PUT /api/v1/user/profile/edit/:id` → Edit profile

---

## 📥 Example Request

### Create Todo

```
POST /api/v1/add
Authorization: Bearer <accessToken>
```

```json
{
  "title": "Learn backend"
}
```

---

## 📊 Pagination Example

```
GET /api/v1/todos?page=1&limit=10
```

```json
{
  "status": "success",
  "results": 10,
  "total": 42,
  "page": 1,
  "totalPages": 5,
  "data": []
}
```

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (jsonwebtoken)
* bcrypt
* Zod (validation)

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```
git clone https://github.com/NiravDongre/Todo-app.git
cd Todo-app
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment

Create a `.env` file:

```
PORT=3000
MONGO_URL=your_mongodb_uri
API_SECRET_KEY=your_access_secret
REFRESH_API_KEY=your_refresh_secret
```

### 4. Run the server

```
npm run dev
```

---

## 🧠 Why This Project Stands Out

* Clean architecture (modular folders)
* Real-world authentication system
* Secure by design
* Scalable patterns

👉 Simple to use for clients, powerful under the hood

---

## 📌 Final Note

This project demonstrates how a backend can remain **simple for users** while being **robust, secure, and production-ready**.

---

## 👨‍💻 Author

Nirav Dongre
