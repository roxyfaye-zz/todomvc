const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    title: {type: String,required: true},
    order: {type: Number,required: true},
    completed: {type: Boolean, default:false},
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

//{id: 1, title: "Mow the lawn", order: 1, completed: false}