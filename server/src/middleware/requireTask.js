const tasksModel = require("../models/tasks");

function requireTask(req, res, next) {
  const boardId = parseInt(req.params.boardId);
  const taskId = parseInt(req.params.taskId);
  const task = tasksModel.getTaskById(boardId, taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  req.task = task;
  next();
}

module.exports = requireTask;
