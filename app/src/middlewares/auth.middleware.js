const jwt = require('jsonwebtoken');
const { API_SECRET_KEY } = require("../config/config");
const asyncHandler = require('../utils/asyncHandler');


const userMiddleware = asyncHandler(async (req, res, next) =>{

    const token = req.headers.token;
    
    if(!token){ throw new CustomError(401,"token required")}

    const response = jwt.verify(token, API_SECRET_KEY);
    req.userid = response.id
    next()
})

module.exports = {
    userMiddleware
}