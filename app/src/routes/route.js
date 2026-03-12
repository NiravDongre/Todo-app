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

user.post("/todo", todo);
user.get("/todo", getTodo);
user.put("/todo", updatetodo);
user.delete("/todo", deletetodo)


module.exports = {
    user
}