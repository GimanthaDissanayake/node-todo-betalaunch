const express = require('express');

const todoController = require('../controllers/todo');

const router = express();

// /api/todo => GET
router.get('/todos/', todoController.getAllTodos);

// /api/todo/update/:id => GET, POST
// router.patch('/todo/', todoController.patchTodo);
// router.post('/todo/', todoController.postUpdatedTodo);

// /api/todo/filterByPriority => GET
// /api/todo/filterByColor => GET
router.get('/todo/', todoController.filterTodos);

// /api/todo {todo} => POST
router.post('/todo/', todoController.createTodo);

// /api/todo/:id => PATCH
router.patch('/todo/', todoController.patchTodo);

// /api/todo/delete/:id => DELETE
router.delete('/todo/', todoController.deleteATodo);

// /api/todo/find/:word => GET
router.get('/find/', todoController.findTodos);


module.exports = router;