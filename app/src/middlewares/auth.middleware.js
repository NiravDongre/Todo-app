const jwt = require('jsonwebtoken');
const { API_SECRET_KEY } = require("../config/config");
const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/CustomError');


const userMiddleware = asyncHandler(async (req, res, next) =>{

    const authorization = req.headers.authorization;

    if(!authorization || !authorization.startsWith("Bearer ")){ throw new CustomError(401, "Authorization Token Required") }

    const token = authorization.split(" ")[1]
    
    if(!token){ throw new CustomError(401,"token required")}

    try{
    const response = jwt.verify(token, API_SECRET_KEY);
    req.userId = response.userId
    next()
    } catch(err){
        console.log(err)
        throw new CustomError(401, "Token Expired or Invalid")
    }
})

module.exports = {
    userMiddleware
}