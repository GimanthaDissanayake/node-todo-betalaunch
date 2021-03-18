const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
},
{
    timestamps: {
        createdAt: 'timestamp',
        updatedAt: false
    }
});

module.exports = mongoose.model('Todo',todoSchema);