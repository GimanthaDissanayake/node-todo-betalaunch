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
exports.deleteATodo = (req, res, next) => {
    const id = req.query.id;
    Todo.findByIdAndDelete(id, (err,todo) => {
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

//////Update a TODO//////
//Patch TODO
exports.patchTodo = (req, res, next) => {
    const updatedTodo = req.body;
    const id = req.query.id;
    Todo.updateOne({_id: ObjectId(id)}, {$set: updatedTodo}, (err,result) => {
        if(err)
            next(err);
        else
            res.json({'status': result});
    });
};

//Get All TODOs
exports.getAllTodos = (req, res, next) => {
    Todo.find({}, (err, todos) => {
        if(err)
            next(err);
        else
            res.json({ todoList: todos });
        });
};

//Find TODOs
exports.findTodos = (req, res, next) => {
    const searchKeyword = req.query.searchKeyword;
    Todo.find({
        "title": /searchKeyword/
    }, (err, result) => {
        if(err)            
            next(err);
        
        console.log(result);
        res.json({'todos':result});
    });
};

exports.filterTodos = (req, res, next) => {
    const filterByPriority = req.query.priority;
    const filterByColor = req.query.color;
    Todo.find({"priority": filterByPriority}, (err, result) => {
        if(err)            
            next(err);
        res.json({'todos': result});
    });

};