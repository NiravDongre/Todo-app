const { profiledit, profile } = require('../controller/usercontroller');


user.get("/profile", userMiddleware , profile);
user.put("/profile/edit/:id", userMiddleware, profiledit);