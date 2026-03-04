const { Router } = require('express');
const { userMiddleware } = require('../middleware/middleware');
const { profiledit, profile } = require('../controller/usercontroller');
const { signup, signin } = require('../controller/authcontroller');
const { todo, getTodo, updatetodo, deletetodo } = require('../controller/todocontroller');


const user = Router();

user.post("/signup", signup);
user.post("/signin", signin);

user.get("/profile", userMiddleware , profile);
user.put("/profile/edit", userMiddleware, profiledit);

user.post("/todo", userMiddleware, todo);
user.get("/todo", userMiddleware, getTodo);
user.put("/todo", userMiddleware, updatetodo);
user.delete("/todo", userMiddleware, deletetodo)


module.exports = {
    user
}