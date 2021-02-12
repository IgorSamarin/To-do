require("dotenv").config();
const { response, json } = require("express");
const express = require("express");
const fs = require("fs");
const { parse } = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

const localStorage = "localStorage.json";
const jsonParser = express.json();

//get all tasks
app.get("/tasks", (req, res) => {
  let tasks = fs.readFileSync(localStorage, "utf-8");
  tasks = JSON.parse(tasks);
  res.send(tasks);
});
// post new task
app.post("/tasks", jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let newTask = {
    text: req.body.text,
  };
  let tasks = fs.readFileSync(localStorage, "utf-8");
  tasks = JSON.parse(tasks);
  let arrIds = [];
  tasks.forEach((element) => {
    arrIds.push(element.id);
  });
  arrIds.sort((a, b) => {
    return a - b;
  });
  if (arrIds.length == 0) {
    newTask.id = 0;
    tasks.push(newTask);
  } else {
    newTask.id = arrIds[arrIds.length - 1] + 1;
    tasks.push(newTask);
  }
  fs.writeFileSync(localStorage, JSON.stringify(tasks));
  res.send(tasks);
});
// delete task by id
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  let tasks = fs.readFileSync(localStorage, "utf-8");
  tasks = JSON.parse(tasks);
  let wasChanged = 0;
  tasks.forEach((e) => {
    if (e.id == id) {
      tasks.splice(tasks.indexOf(e), 1);
      fs.writeFileSync(localStorage, JSON.stringify(tasks));
      wasChanged = true;
    }
  });
  if (wasChanged) {
    res.send(tasks);
  } else {
    res.send(`User with id: ${id} doesnt exist.`);
  }
});
// edit task by id
app.put("/tasks/:id", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const taskText = req.body.text;
  const id = req.params.id;
  let tasks = fs.readFileSync(localStorage, "utf-8");
  tasks = JSON.parse(tasks);
  console.log(typeof id);
  let wasChanged = 0;
  tasks.forEach((e) => {
    if (e.id == parseInt(id)) {
      e.text = taskText;
      fs.writeFileSync(localStorage, JSON.stringify(tasks));
      wasChanged = true;
    }
  });
  if (wasChanged) {
    res.send(tasks);
  } else {
    res.send(`User with id: ${id} doesnt exist.`);
  }
});

app.listen(PORT, () => console.log(`server has been started on ${PORT}`));


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