const tasksModel = require("../models/tasks");

function requireTask(req, res, next) {
  const taskId = parseInt(req.params.taskId);
  const task = tasksModel.getTaskById(req.board.id, taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  req.task = task;
  next();
}

module.exports = requireTask;
