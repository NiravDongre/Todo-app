const { Router } = require('express');
const { userMiddleware } = require('../middleware/middleware');
const { profiledit, profile } = require('../controller/usercontroller');
const { signup, signin } = require('../controller/authcontroller');


const user = Router();

user.post("/signup", signup);
user.post("/signin", signin);
user.get("/profile", userMiddleware , profile);
user.put("/profile/edit", userMiddleware, profiledit)


module.exports = {
    user
}