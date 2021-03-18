const Todo = require("../models/todo");
var isHexcolor = require('is-hexcolor');
const { ObjectId } = require("mongodb");

//Create a new TODO
exports.createTodo = async (req, res, next) => {
    if(!isHexcolor(req.body.color))
        res.send('Invalid Color!');
    else {
        const todo = new Todo({
            title: req.body.title,
            color: req.body.color,
            priority: req.body.priority
        });

        try{
            await todo.save();
            res.json({'status': 'successfully inserted'});
        } catch (err) {
            if(!err.statusCode)
                err.statusCode = 500;
            next(err);
        }
    }
};

//Delete a TODO
exports.deleteATodo = async (req, res, next) => {
    const id = req.query.id;
    await Todo.findByIdAndDelete(id, (err,todo) => {
        if(err)
            next(err);
        else{
            if(todo){
                console.log('Deleted : ',todo);
                res.json({'status': 'successfully deleted', 'todo': todo});
            } else {
                res.json({'status':'todo not found'});
            }
            
        }    
            
    });
};

//Update a TODO
exports.patchTodo = async (req, res, next) => {
    const updatedTodo = req.body;
    const id = req.query.id;
    await Todo.updateOne({_id: ObjectId(id)}, {$set: updatedTodo}, (err,result) => {
        if(err)
            next(err);
        else
            res.json({'status': result});
    });
};

//Get All TODOs
exports.getAllTodos = async (req, res, next) => {
    await Todo.find({}, (err, todos) => {
        if(err)
            next(err);
        else
            res.json({ todoList: todos });
        });
};

//Find TODOs by searchKeyword
exports.findTodosByKeyword = (req, res, next) => {
    if(!req.query.searchKeyword)
        next();
    else{
        const searchKeyword = req.query.searchKeyword;
        Todo.find({
            "title":  {$regex: `${searchKeyword}`}
        }, (err, result) => {
            if(err)            
                next(err);        
            res.json({'todos':result});
        });
    }    
};

//Find TODOs by priority
exports.findTodosByPriority = (req, res, next) => {
    if(!req.query.priority)
        next();
    else{
        const filterByPriority = req.query.priority;
        Todo.find({"priority": filterByPriority}, (err, result) => {
            if(err)            
                next(err);
            res.json({'todos': result});
        });
    }    
};

//Find TODOs by color
exports.findTodosByColor = (req, res, next) => {
    if(!req.query.color)
        next();
    else{
        const filterByColor = req.query.color;
        Todo.find({"color": filterByColor}, (err, result) => {
            if(err)            
                next(err);
            res.json({'todos': result});
        });
    }
};

//Find TODOs after a specific start date
exports.findTodosByStartDate = (req, res, next) => {
    if(!req.query.startDate)
        next();
    else{
        const startDate = new Date(req.query.startDate);
        console.log(startDate);
        Todo.find({"timestamp": { $gt: `${startDate}` }}, (err, result) => {
            if(err)            
                next(err);
            res.json({'todos': result});
        });
    }
};

//Find TODOs before a specific end date
exports.findTodosByEndDate = (req, res, next) => {
    if(!req.query.endDate)
        next();
    else{
        const endDate = new Date(req.query.endDate);
        Todo.find({"timestamp": { $lt: `${endDate}` }}, (err, result) => {
            if(err)            
                next(err);
            res.json({'todos': result});
        });
    }
};