const Router = require("express");
const Todo = Router()
const { userMiddleware } = require('../middlewares/auth.middleware');
const { todo, gettodo, updatetodo, deletetodo,  } = require("../controllers/todo.controller");


Todo.post("/todo", userMiddleware, todo);
Todo.get("/todo", userMiddleware,gettodo);
Todo.put("/todo/:id", userMiddleware, updatetodo);
Todo.delete("/todo/:id", userMiddleware, deletetodo)

module.exports = {
    Todo
}
