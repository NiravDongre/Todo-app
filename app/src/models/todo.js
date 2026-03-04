const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const todo = new Schema({
    title: {type: String},
    complete: {type: Boolean, default: false},
    userid: { type: ObjectId } ,
    createdAt: {type: Date, default: Date.now}
})

const Todomodel = mongoose.model("todo", todo);

module.exports = {
    Todomodel
}