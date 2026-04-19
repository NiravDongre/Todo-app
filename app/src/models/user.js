const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true, default: "abc@gmail.com"},
    password: {type: String, default: "123456"},
    name: { type: String ,  maxLength:100 },
    bio: { type: String , maxLenght: 300 },
    Image: { type: String },
    refreshToken: { type: String, default: null}
},{ timestamps: true }
)

const Usermodel = mongoose.model("user", user);

module.exports = {
    Usermodel
}
