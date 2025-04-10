const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];

// Endpoint для получения всех задач
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Endpoint для добавления новой задачи
app.post('/tasks', (req, res) => {
  const task = req.body.task;
  if (task) {
    tasks.push(task);
    res.status(201).json({ message: 'Задача добавлена', tasks });
  } else {
    res.status(400).json({ message: 'Введите задачу' });
  }
});

// Endpoint для удаления задачи
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  if (taskId >= 0 && taskId < tasks.length) {
    tasks.splice(taskId, 1);
    res.json({ message: 'Задача удалена', tasks });
  } else {
    res.status(404).json({ message: 'Задача не найдена' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});