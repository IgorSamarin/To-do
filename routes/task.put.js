const express = require('express');
const router = express.Router();
const fs = require('fs');

// edit task by id 
router.put('/:id', function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const taskText = req.body.text;
  const id = req.params.id;
  let tasks = fs.readFileSync(localStorage, 'utf-8');
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

module.exports = router;
