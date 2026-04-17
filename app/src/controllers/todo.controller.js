const { Todomodel } = require('../models/todo'); 
const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/CustomError');


const todo = asyncHandler(async(req, res) => {
    const user = req.userid;
    const { title } = req.body;

    if(!title){ throw new CustomError(400, "Invalid Title")}

    const todo =  await Todomodel.create({
        title: title,
        complete: false,
        userid: user
    })

    if(!todo){ throw new CustomError(404, "Todo's not Created")}

    return res.status(201).json({
        message: "Todo has created",
        todo: todo
    })
})


const gettodo = asyncHandler(async(req, res) => {
    
    const userid = req.userid;

    const todos = await Todomodel.find({userid}).select('-__v');
    
    if(!todos){ throw new CustomError(404, "Not Found")}

    return res.status(200).json({
        todos: todos
    })
})


const updatetodo = asyncHandler(async(req, res) => {

    const userid = req.userid;
    const todoid = req.params.id;
    const { title, complete } = req.body;

    const todos = await Todomodel.findOneAndUpdate(
    { userid: userid,
     _id: todoid },
    {
        title: title,
        complete: complete,
    },{new: true}).select("-__v")


    if(!todos){throw new CustomError(403, "Not authrized or Todo not found")}

    return res.status(200).json({
        user: "The updated todo is here",
        todos: todos
    })

})

const deletetodo = asyncHandler(async (req, res) => {

    const user = req.userid;
    const todoid = req.params.id
    
    const todos = await Todomodel.findOneAndDelete(
        {
           userid: user,
            _id: todoid
        });

    if(!todos){ throw new CustomError(403, "Not authrized or Todo not found")}

    return res.status(200).json({
        message: "the todo got deleted"
    })
})

module.exports = {
    todo, gettodo, updatetodo, deletetodo
}