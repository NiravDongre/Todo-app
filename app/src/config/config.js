const mongoose = require("mongoose")
const CustomError = require("../utils/CustomError")

const API_SECRET_KEY = process.env.API_SECRET_KEY

if(!API_SECRET_KEY){
    throw new CustomError(401, "JWT_SECRET IS MISSING")
}
const main = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=> {console.log("connected to db")})
    .catch(err => console.log(err))
}


module.exports = {
    API_SECRET_KEY: API_SECRET_KEY,
    main
}