const { signup, signin } = require('../controller/authcontroller');

user.post("/signup", signup);
user.post("/signin", signin);