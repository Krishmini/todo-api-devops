const express = require("express");

const router = express.Router();

let tasks = [];
let nextId = 1;

router.get("/", (req, res) => {
  res.status(200).json(tasks);
});


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Tâche introuvable",
    });
  }

  return res.status(200).json(task);
});

router.post("/", (req, res) => {
  const { description, status = "todo" } = req.body;

  const newTask = {
    id: nextId,
    description,
    status,
  };

  tasks.push(newTask);
  nextId += 1;

  return res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      error: "Tâche introuvable",
    });
  }

  const { description, status } = req.body;

  const updatedTask = {
    id,
    description,
    status,
  };

  tasks[taskIndex] = updatedTask;

  return res.status(200).json(updatedTask);
});


router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Tâche introuvable",
    });
  }

  const { description, status } = req.body;

  if (description !== undefined) {
    task.description = description;
  }

  if (status !== undefined) {
    task.status = status;
  }

  return res.status(200).json(task);
});


router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      error: "Tâche introuvable",
    });
  }

  tasks.splice(taskIndex, 1);

  return res.status(204).send();
});

module.exports = router;