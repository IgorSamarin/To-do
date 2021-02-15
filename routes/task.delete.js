const express = require('express');
const router = express.Router();
const fs = require('fs');

// delete task by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  let tasks = fs.readFileSync(localStorage, 'utf-8');
  console.log(id);
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
module.exports = router;
