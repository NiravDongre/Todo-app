const { todo, getTodo, updatetodo, deletetodo } = require('../controller/todocontroller');


user.post("/todo", userMiddleware, todo);
user.get("/todo", userMiddleware,getTodo);
user.put("/todo/:id", userMiddleware, updatetodo);
user.delete("/todo/:id", userMiddleware, deletetodo)
