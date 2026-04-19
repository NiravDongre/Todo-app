const jwt = require('jsonwebtoken');
const { REFRESH_API_KEY, API_SECRET_KEY } = require("../config/config");
const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/CustomError');
const { Usermodel } = require('../models/user');


const RefreshTokenHandler = asyncHandler(async (req, res) =>{

    const authorization = req.headers.authorization;

    if(!authorization || !authorization.startsWith("Bearer ")){ throw new CustomError(401, "Authorization Token Required") }

    const token = authorization.split(" ")[1]

    let response;

    try{
     response = jwt.verify(token, REFRESH_API_KEY);

    } catch(err){
        throw new CustomError(401, "Token Expired or Invalid")
    }

    if(!response){
        return new CustomError(404, "User not found")
    }

    const user = await Usermodel.findById(response.userId);

    if(!user){
        throw new CustomError(404, "User not Found")
    }

    if(user.refreshToken !== token){
        throw new CustomError(401, "Invalid token")
    }

    const newaccesstoken = jwt.sign({userId: user._id}, API_SECRET_KEY, 
        {expiresIn: "15m"}
    )

    const newrefreshtoken = jwt.sign({userId: user._id}, REFRESH_API_KEY, 
        {expiresIn: "15d"}
    )

    user.refreshToken = newrefreshtoken;
    await user.save()

    return res.json({
        newaccesstoken,
        newrefreshtoken
    })
})

module.exports = {
    RefreshTokenHandler
}