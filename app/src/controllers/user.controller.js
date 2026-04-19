const { Usermodel } = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/CustomError");

const profile = asyncHandler(async(req, res, next) => {
    const user = req.userId;

    const profile = await Usermodel.findById(user, "-password -email -__v")

    if(!profile){
        throw new CustomError(404, "User not Found")
    }

    return res.json({
        message: "Profile fetched",
        profile: profile
    })
    
})


 const profiledit = asyncHandler(async(req, res, next) => {

    const user = req.userid;
    const { name, bio, image } = req.body;

    const profile = await Usermodel.findByIdAndUpdate(user, { 
    $set:  {
        bio: bio,
        name: name,
        Image: image
    
    }}, {new: true}).select("-password -email -__v");

    if(!profile){
        return next(err.status = 404, err.message = "Incorrect creditials") 
    }

    return res.status(200).json({
        user: user,
        profile
    })

})

module.exports = {
    profile, profiledit
}
