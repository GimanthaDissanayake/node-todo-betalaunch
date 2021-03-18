const Todo = require("../models/todo");
var isHexcolor = require('is-hexcolor');

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
            res.send('success');
        } catch (err) {
            if(!err.statusCode)
                err.statusCode = 500;
            next(err);
        }
    }
};

//Delete a TODO

//Update a TODO

//Get TODOs
exports.getAllTodos = (req, res, next) => {
    Todo.find({}, (err, todos) => {
        console.log(todos);
        res.send({ todoList: todos });
        });
};