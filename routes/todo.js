const express = require('express');

const todoController = require('../controllers/todo');

const router = express();

// /api/todo => GET 
router.get('/todos', todoController.getAllTodos);

// /api/todo {todo} => POST 
router.post('/todo', todoController.createTodo);

// /api/todo/?id => PATCH 
router.patch('/todo', todoController.patchTodo);

// /api/todo/delete/?id => DELETE 
router.delete('/todo/', todoController.deleteATodo);

// /api/todo/?searchKeyword 
// /api/todo/?priority 
// /api/todo/?color 
// /api/todo/?startDate 
// /api/todo/?endDate 
router.get('/todo', todoController.findTodosByKeyword, 
                    todoController.findTodosByPriority, 
                    todoController.findTodosByColor,
                    todoController.findTodosByStartDate,
                    todoController.findTodosByEndDate);

module.exports = router;