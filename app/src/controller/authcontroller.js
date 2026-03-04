const { API_SECRET_KEY } = require("../config/config");
const { Usermodel } = require("../models/user");
const { protection } = require("../schema/user.schema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const signup = async (req, res, next) => {

    try{

    const payload = req.body;
    
    const createpayload = protection.safeParse(payload);

    if(!createpayload.success){
        return res.status(400).json({
            message: "Wrong inputs"
        });
    }

    const { username, email, password } = createpayload.data;

    const existedemail  = await Usermodel.findOne({
        email: email
    })
    if(existedemail){
        return res.status(400).json({
            message: "The username or email is already existed"
        })
    }

    const hashing = await bcrypt.hash(password, 10);

    await Usermodel.create({
        username,
        email,
        password: hashing
    })

    return res.status(201).json({
        message: "User has Signed Up"
    })

   }catch(e){
    next(e)
   }

}

const signin = async (req, res, next) => {
    try {
    const preload = req.body;
    const postload = protection.safeParse(preload);

    if(!postload.success){
        return res.status(400).json({
            message: "Wrong input"
        })
    }

    const { username, email ,password } = postload.data;

    if(!username || !password || !email ){
        return res.status(404).json({
            message: "Pls put correct input"
        })
    }

    const user = await Usermodel.findOne({
        username: username
    })
    
    if(!user){
        return res.status(404).json({
            message: "Incorrect Cred"
        })
    }

    const passing = await bcrypt.compare(password, user.password)

    if(!passing){
        return res.json({
            message: "Incorrect password"
        })
    }

    const token = jwt.sign(
        {id : user._id.toString()},
         API_SECRET_KEY ,
        { expiresIn: 60 * 60 * 24 });

    return res.status(200).json({
        token: token,
        message: "User can login through this token"
    })

}catch(e){
    next(e)
 }
}


module.exports = {
    signup, signin
}