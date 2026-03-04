const mongoose = require("mongoose");
const { required, maxLength } = require("zod/mini");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String,
    name: { type: String ,  maxLength:100 },
    bio: { type: String , maxLenght: 300 },
    Image: { type: String },
    Date: Date
})

const Usermodel = mongoose.model("user", user);

module.exports = {
    Usermodel
}
