const express = require('express');

const todoController = require('../controllers/todo');

const router = express();

// /api/todo/delete/:id => DELETE
router.delete('/delete/', todoController.deleteATodo);

// /api/todo {todo} => POST
router.post('/', todoController.createTodo);

// /api/todo => GET
router.get('/', todoController.getAllTodos);

module.exports = router;