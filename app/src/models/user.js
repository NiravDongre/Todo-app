const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String,
    name: { type: String ,  maxLength:100 },
    bio: { type: String , maxLenght: 300 },
    Image: { type: String },
    createId: {type: Date, default: Date.now}
})

const Usermodel = mongoose.model("user", user);

module.exports = {
    Usermodel
}
