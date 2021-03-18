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
// Get a single TODO
exports.getUpdateTodo = (req,res,next) => {
    const id = req.query.id;
    Todo.findById(id, (err,todo) => {
        if(!todo)
            res.json({'status':'ToDo not found'});
        else if(err)
            next(err);
        else{
            res.json({'todo': todo});
        }
    });
};
//Post the updated Todo
exports.postUpdatedTodo = (req,res,next) => {
    const id = req.query.id;
    const updatedTodo = new Todo({
        title: req.body.title,
        color: req.body.color,
        priority: req.body.priority
    });
    Todo.findByIdAndUpdate(id, {
            title:updatedTodo.title,
            color:updatedTodo.color,
            priority:updatedTodo.priority
        }, (err) => {
        if(err)
            next(err);
        else {
            res.json({'status': 'successfully updated'});
        }
    });
};

//Get All TODOs
exports.getAllTodos = (req, res, next) => {
    Todo.find({}, (err, todos) => {
        console.log(todos);
        res.send({ todoList: todos });
        });
};