const express = require('express');
const router = express.Router();
const fs = require('fs');

//get all tasks
router.get('/', (req, res) => {
  let tasks = fs.readFileSync(localStorage, 'utf-8');
  tasks = JSON.parse(tasks);
  res.send(tasks);
});

module.exports = router;
