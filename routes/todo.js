const express = require('express');

const todoController = require('../controllers/todo');

const router = express();

// /api/todo/delete/:id => DELETE
router.delete('/delete/', todoController.deleteATodo);

// /api/todo/update/:id =>
router.get('/update/', todoController.getUpdateTodo);
router.post('/update/', todoController.postUpdatedTodo);

// /api/todo {todo} => POST
router.post('/', todoController.createTodo);

// /api/todo => GET
router.get('/', todoController.getAllTodos);

module.exports = router;