const { Router } = require('express');
const { Sign } = require('./auth.route');
const { User } = require('./user.route');
const { Todo } = require('./todo.route');

const router = Router();

router.use("/auth", Sign)
router.use("/user", User);
router.use("/todo", Todo)

module.exports = {
    router
}