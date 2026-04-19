const mongoose = require("mongoose")
const CustomError = require("../utils/CustomError")

const API_SECRET_KEY = process.env.API_SECRET_KEY;
const REFRESH_API_KEY = process.env.REFRESH_API_KEY

if(!API_SECRET_KEY){
    throw new CustomError(401, "JWT_SECRET IS MISSING")
}

if(!REFRESH_API_KEY){
    throw new CustomError(401, "JWT_SECRET IS MISSING")
}

const main = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=> {console.log("connected to db")})
    .catch(err => console.log(err))
}


module.exports = {
    REFRESH_API_KEY: REFRESH_API_KEY,
    API_SECRET_KEY: API_SECRET_KEY,
    main
}