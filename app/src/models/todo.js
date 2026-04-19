const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const todo = new Schema({
    title: String,
    complete: {type: Boolean, default: false},
    userId: { type: ObjectId }
},{ timestamps: true })

const Todomodel = mongoose.model("todo", todo);

module.exports = {
    Todomodel
}