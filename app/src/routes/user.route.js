const Router = require("express");
const User = Router();
const { userMiddleware } = require('../middlewares/auth.middleware');
const { profile, profiledit } = require("../controllers/user.controller");


User.get("/profile", userMiddleware , profile);
User.put("/profile/edit/:id", userMiddleware, profiledit);

module.exports = {
    User
}