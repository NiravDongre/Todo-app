const { Router } = require("express");
const Sign = Router()

const { signup, signin } = require("../controllers/auth.controller");


Sign.post("/signup", signup);
Sign.post("/signin", signin);

module.exports = { Sign }