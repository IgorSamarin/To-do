const express = require('express');
const router = express.Router();
const fs = require('fs');

// post new task
router.post('/', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let newTask = {
    text: req.body.text,
  };
  let tasks = fs.readFileSync(localStorage, 'utf-8');
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

module.exports = router;
