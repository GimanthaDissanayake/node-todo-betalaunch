const express = require('express');

const todoController = require('../controllers/todo');

const router = express();

// /api/todo => GET **COMPLETE**
router.get('/todos', todoController.getAllTodos);

// /api/todo {todo} => POST **COMPLETE**
router.post('/todo', todoController.createTodo);

// /api/todo/?id => PATCH **COMPLETE**
router.patch('/todo', todoController.patchTodo);

// /api/todo/delete/?id => DELETE **COMPLETE**
router.delete('/todo/', todoController.deleteATodo);

// /api/todo/?searchKeyword
// /api/todo/?priority **COMPLETE**
// /api/todo/?color **COMPLETE**
router.get('/todo', todoController.findTodosByKeyword, 
                    todoController.findTodosByPriority, 
                    todoController.findTodosByColor,
                    todoController.findTodosByStartDate,
                    todoController.findTodosByEndDate);

module.exports = router;