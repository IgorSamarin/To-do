require('dotenv').config();
const express = require('express');
const fs = require('fs');

const getTask = require('./routes/task.get');
const postTask = require('./routes/task.post');
const deleteTask = require('./routes/task.delete');
const putTask = require('./routes/task.put');

localStorage = 'localStorage.json';

const jsonParser = express.json();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(jsonParser);
app.use('/tasks', getTask);
app.use('/task', postTask);
app.use('/task', deleteTask)
app.use('/task', putTask)

// delete task by id
// app.delete('/task/:id', (req, res) => {
//   const id = req.params.id;
//   let tasks = fs.readFileSync(localStorage, 'utf-8');
//   tasks = JSON.parse(tasks);
//   let wasChanged = 0;
//   tasks.forEach((e) => {
//     if (e.id == id) {
//       tasks.splice(tasks.indexOf(e), 1);
//       fs.writeFileSync(localStorage, JSON.stringify(tasks));
//       wasChanged = true;
//     }
//   });
//   if (wasChanged) {
//     res.send(tasks);
//   } else {
//     res.send(`User with id: ${id} doesnt exist.`);
//   }
// });
// edit task by id
// app.put('/task/:id', function (req, res) {
//   if (!req.body) return res.sendStatus(400);
//   const taskText = req.body.text;
//   const id = req.params.id;
//   let tasks = fs.readFileSync(localStorage, 'utf-8');
//   tasks = JSON.parse(tasks);
//   console.log(typeof id);
//   let wasChanged = 0;
//   tasks.forEach((e) => {
//     if (e.id == parseInt(id)) {
//       e.text = taskText;
//       fs.writeFileSync(localStorage, JSON.stringify(tasks));
//       wasChanged = true;
//     }
//   });
//   if (wasChanged) {
//     res.send(tasks);
//   } else {
//     res.send(`User with id: ${id} doesnt exist.`);
//   }
// });

// app.listen(PORT, () => console.log(`server has been started on ${PORT}`));

//get tasks by id
// app.get("/tasks/:id", (req, res) => {
//   const id = req.params.id;
//   let tasks = fs.readFileSync(localStorage, "utf-8");
//   tasks = JSON.parse(tasks);
//   let task;
//   tasks.forEach((e) => {
//     if (e.id == parseInt(id)) {
//       task = e;
//       res.send(task);
//     }
//   });
//   if (!task) {
//     res.send("Task doesnt exist!");
//   }
// });

//npm inint
//npm 1 -D nodemon dotenv
// nom run dev
// scripts "dev": "nodemon app.js"

app.listen(PORT, () => console.log(`server has been started on ${PORT}`));
