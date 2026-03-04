const { Usermodel } = require("../models/user");

const profile = async(req, res, next) => {
    try{
    const user = req.userid;

    const profile = await Usermodel.findById(user, "-password -email -__v")

    if(!profile){
        return res.status(404).json({message: "User not Found"})
    }

    return res.json({
        message: "Profile fetched",
        profile: profile
    })
    
    }catch(e){
      e.status = 404;
      e.message = "User not found"
      next(e)
    }
}


 const profiledit = async(req, res, next) => {
    try{
        const user = req.userid;
        const { name, bio, image } = req.body;

    const profile = await Usermodel.findByIdAndUpdate(user, { 
        $set:  {
            bio: bio,
            name: name,
            Image: image
        
    }}, {new: true}

).select("-password -email -__v");

        if(!profile){
            return next(err.status = 404, err.message = "Incorrect creditials") 
        }

        return res.status(200).json({
            user: user,
            profile
        })

    }
  catch(e){
    next(e)
 }

}

module.exports = {
    profile, profiledit
}
