const jwt = require('jsonwebtoken');
const { REFRESH_API_KEY, API_SECRET_KEY } = require("../config/config");
const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/CustomError');
const { Usermodel } = require('../models/user');


const RefreshTokenHandler = asyncHandler(async (req, res) =>{

    const authorization = req.headers.authorization;

    if(!authorization || !authorization.startsWith("Bearer ")){ throw new CustomError(401, "Authorization Token Required") }

    const token = authorization.split(" ")[1]
    
    if(!token){ throw new CustomError(401,"token required")}

    let response;

    try{
     response = jwt.verify(token, REFRESH_API_KEY);

    } catch(err){
        throw new CustomError(401, "Token Expired or Invalid")
    }

    const user = await Usermodel.findById(response.userId);

    const newAccessToken = jwt.sign({userId: user._id}, API_SECRET_KEY, 
        {expiresIn: "15m"}
    )

    const newRefreshToken = jwt.sign({userId: user._id}, API_SECRET_KEY, 
        {expiresIn: "15d"}
    )

    user.refreshToken = newRefreshToken;
    await user.save()

    return res.json({
        newAccessToken,
        newRefreshToken
    })
})

module.exports = {
    RefreshTokenHandler
}