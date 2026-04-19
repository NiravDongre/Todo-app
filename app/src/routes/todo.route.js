const Router = require("express");
const Todo = Router()
const { userMiddleware } = require('../middlewares/auth.middleware');
const { todo, gettodo, updatetodo, deletetodo,  } = require("../controllers/todo.controller");


Todo.post("/add", userMiddleware, todo);
Todo.get("/todos", userMiddleware,gettodo);
Todo.put("/todos/:id", userMiddleware, updatetodo);
Todo.delete("/todos/:id", userMiddleware, deletetodo)

module.exports = {
    Todo
}
