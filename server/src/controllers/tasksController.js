const tasksModel = require("../models/tasks");
const { broadcastToBoard } = require("../utiles/broadcastToBoard");

function getTasksByBoard(req, res) {
  const tasks = tasksModel.getTasksByBoard(req.board.id);
  res.json(tasks);
}

function createTask(req, res) {
  if (req.body.id) {
    return res.status(400).json({ error: "Cannot create task with ID" });
  }
  const task = tasksModel.createTask(req.board.id, req.body);
  if (task) {
    broadcastToBoard(req.board.id, "taskCreated", task);
    res.status(201).json(task);
  } else {
    res.status(400).json({ error: "Failed to create task" });
  }
}

function deleteAllTasksForBoard(req, res) {
  tasksModel.deleteAllTasksForBoard(req.board.id);

  res.json({ message: "All tasks deleted" });
}

function getTaskById(req, res) {
  res.json(req.task);
}

function updateTask(req, res) {
  if (req.body.id) {
    return res.status(400).json({ error: "Cannot update task ID" });
  }
  const updatedTask = tasksModel.updateTask(
    req.board.id,
    req.task.id,
    req.body
  );
  broadcastToBoard(req.board.id, "taskUpdated", updatedTask);
  res.json(updatedTask);
}

function deleteTask(req, res) {
  const deletedTask = tasksModel.deleteTask(req.board.id, req.task.id);
  broadcastToBoard(req.board.id, "taskDeleted", deletedTask);
  res.json(deletedTask);
}

module.exports = {
  getTasksByBoard,
  createTask,
  deleteTask,
  deleteAllTasksForBoard,
  getTaskById,
  updateTask,
};
