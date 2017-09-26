const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const application = express();
const Todo = require('./models/todo');
mongoose.connect('mongodb://localhost:27017/Todo');
application.use('/static', express.static('static'));
application.use(bodyParser.json());

application.get('/', function (request, response) {
    response.sendFile(__dirname + "/static/index.html");
})

application.get('/api/todos', async (request, response) => {
    var todos = await Todo.find();
    return response.json(todos);
});
application.post('/api/todos',(request, response) => {

    var todo = new Todo(request.body);

    todo.save(function(err, newItem){
        response.json(newItem);
    })
});

application.get('/api/todos/:id', async(request, response) => {
    let id = request.params.id;
    let todo = await Todo.find({ _id: id });

    if (!todo) {
        response.status(404);
        return response.end();
    }
    return response.json(todo);
});
application.put('/api/todos/:id', async (request, response) => {
    var id = request.params.id;
    var todos = request.body;
    var existing = await Todo.findOne({ _id: request.params.id });
    existing.name = todos.name;
    existing.completed = todos.completed;
    existing.save();
    return response.json(existing);
   
});

application.patch('/api/todos/:id', (request, response) => {
    Todo.findByIdAndUpdate(request.params.id, function(error, updatedTodo) {
        response.send(updatedTodo);
  });
});


application.delete('/api/todos/:id', (request, response) => {

    Todo.findByIdAndRemove(request.params.id, function(error, deletedTodo) {
        response.send(deletedTodo);
      });
    });
    

application.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});






