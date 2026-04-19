const { API_SECRET_KEY, REFRESH_API_KEY } = require("../config/config");
const { Usermodel } = require("../models/user");
const { protection, loginSchema } = require("../validations/user.validation");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require("../utils/CustomError");
const asyncHandler = require("../utils/asyncHandler");


const signup = asyncHandler(async (req, res) => {
   
    const payload = req.body;
    const createpayload = protection.safeParse(payload);

    if(!createpayload.success){
        throw new CustomError(400, "Invalid Input")
    }

    const { username, email, password } = createpayload.data

    const existedemail  = await Usermodel.findOne({
     $or: [
    { email: email },
    { username: username }
    ] 
    })

    if(existedemail){
        throw new CustomError(400, "User already exists")
    }

    const hashing = await bcrypt.hash(password, 10);
    
    await Usermodel.create({
        username,
        email,
        password: hashing
    })

    return res.status(201).json({
        status: "success",
        message: "User has Signed Up"
    })

})

const signin = asyncHandler(async (req, res) => {
    const preload = req.body;
    const postload = loginSchema.safeParse(preload);

    if(!postload.success){ throw new CustomError(400, "Invalid Input") }

    const { username, password } = postload.data;
    
    const user = await Usermodel.findOne({ username: username }).select("+password")
    
    const passing = await bcrypt.compare(password, user.password)

    if(!user || !passing){
        throw new CustomError(400, "Incorrect Password")
    }

    const userId = user._id;
    
    const accesstoken = jwt.sign( {userId}, API_SECRET_KEY ,
    { expiresIn: "15m" });

    const refreshtoken = jwt.sign( {userId, email: user.email}, REFRESH_API_KEY, 
    { expiresIn: 60 * 60 * 24 * 15});

    user.refreshToken = refreshtoken;
    await user.save()

    return res.status(200).json({
        accesstoken,
        refreshtoken,
        message: "User has Logged-In"
    })

})

const logout = asyncHandler(async(req, res) => {

    const userId = req.userId

    const user = await Usermodel.findById(userId);

    user.refreshToken = null
    await user.save();

    return res.json({
        message: "Loggout successfully"
    })
})

module.exports = {
    signup, signin, logout 
}