const { Todomodel } = require('../models/todo') 


const todo = async(req, res, next) => {
    const user = req.userid;
    const {title} = req.body;
    if(!title){
        return res.json({
            message: "Incorrect Credintial"
        })
    }
    try{
     const todo =  await Todomodel.create({
        title: title,
        complete: false,
        userid: user
    })
    if(!todo){
        return res.status(404).json({
            message: "Incorrect Credintial"
        })
    }
    return res.status(201).json({
        message: "Todo has created"
    })
}catch(e){
    next(e)
}
}


const getTodo = async(req, res, next) => {
    
    try{
    const userid = req.userid;

    const todos = await Todomodel.find({userid}).select('-__v');
    
    if(!todos){
        return res.status(404).json({
            message: "User not found"
        })
    }

    return res.status(200).json({
        todo: "Todos you have created are here",
        todos
    })
}catch(e){
    next(e)
}
}


const updatetodo = async(req, res, next) => {
    try{
        const userid = req.userid;
        const todoid = req.params.id;
        const { title, complete } = req.body;

        const todos = await Todomodel.findOneAndUpdate(
        { userid: userid , _id: todoid},
        {
            title: title,
            complete: complete,
        },{new: true}).select("-__v")


        if(!todos){
            return res.status(403).json({
                message: "Not authrized or todo not found"
            })
        }

        return res.status(200).json({
            user: "The updated todo is here",
            todos: todos
        })
    }catch(e){
        next(e)
    }
}

const deletetodo = async (req, res, next) => {
    try{
    const user = req.userid;
    const todoid = req.params.id;
    
    const todos = await Todomodel.findOneAndDelete(
        {
           userid: user,
            _id: todoid
        });

    if(!todos){
        return res.status(403).json({
            message: "Not authrized or Todo not found"
        })
    }

    return res.status(200).json({
        message: "the todo got deleted"
    })
    } catch(e){
        next(e)
    }
}

module.exports = {
    todo, getTodo, updatetodo, deletetodo
}