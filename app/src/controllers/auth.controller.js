const { API_SECRET_KEY } = require("../config/config");
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
    
    const token = jwt.sign(
        {userId : user._id},
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