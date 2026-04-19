const { Router } = require("express");
const Sign = Router()

const { signup, signin, logout } = require("../controllers/auth.controller");
const { RefreshTokenHandler } = require("../middlewares/refreshTokenHandler");


Sign.post("/signup", signup);
Sign.post("/signin", signin);
Sign.post("/refresh", RefreshTokenHandler);
Sign.post("/logout", logout);

module.exports = { Sign }