const tasksByBoard = new Map();

function getTasksByBoard(boardId) {
  return tasksByBoard.get(boardId) || [];
}

function getTaskById(boardId, taskId) {
  const tasks = getTasksByBoard(boardId);
  return tasks.find((t) => t.id === taskId);
}

function createTask(boardId, task) {
  if (!tasksByBoard.has(boardId)) {
    tasksByBoard.set(boardId, []);
  }
  tasksByBoard.get(boardId).push(task);
}

function updateTask(boardId, taskId, updates) {
  const tasks = getTasksByBoard(boardId);
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    Object.assign(task, updates);
    return task;
  }
  return null;
}

function deleteTask(boardId, taskId) {
  const tasks = getTasksByBoard(boardId);
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    const [deletedTask] = tasks.splice(index, 1);
    return deletedTask;
  }
  return null;
}

module.exports = {
  getTasksByBoard,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
