const { API_SECRET_KEY } = require("../config/config");
const { Usermodel } = require("../models/user");
const { protection } = require("../schema/user.schema");
const { loginSchema } = require("../schema/user.schema")
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

    const { username, email, password } = req.body

    const existedemail  = await Usermodel.findOne({
     $or: [
    { email: email },
    { username: username }
  ]
})

    if(existedemail){
        throw new CustomError(400, "This User is already sign-up pls try log using sign-in")
    }

    const hashing = await bcrypt.hash(password, 10);

    const user = await Usermodel.create({
        username,
        email,
        password: hashing
    })

    if(!user){
        throw new CustomError(400, "Try Again")
    }

    return res.status(201).json({
        message: "User has Signed Up"
    })

})

const signin = asyncHandler(async (req, res) => {
    const preload = req.body;
    const postload = loginSchema.safeParse(preload);

    if(!postload.success){
        throw new CustomError(400, "Invalid Input")
    }

    const { username, password } = postload.data;

    const user = await Usermodel.findOne({
        username: username
    })
    
    if(!user){
        throw new CustomError(400, "Incorrect Credintials")
    }

    const passing = await bcrypt.compare(password, user.password)

    if(!passing){
        throw new CustomError(400, "Incorrect Password")
    }

    const token = jwt.sign(
        {id : user._id.toString()},
         API_SECRET_KEY ,
        { expiresIn: 60 * 60 * 24 });

    return res.status(200).json({
        token: token,
        message: "User has Logged-In"
    })

})

module.exports = {
    signup, signin
}