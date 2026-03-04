const jwt = require('jsonwebtoken');
const { API_SECRET_KEY } = require("../config/config");


const userMiddleware = async (req, res, next) =>{

    const token = req.headers.token;
    if(!token){
        return res.json({
            message: "token required"
        })
    }
    try{
    const response = jwt.verify(token, API_SECRET_KEY);
    req.userid = response.id
    next()
    }catch(e){
        err.status = 401;
        err.message = "The token is incorrect or expired"
        next(err)
    }

}

module.exports = {
    userMiddleware
}