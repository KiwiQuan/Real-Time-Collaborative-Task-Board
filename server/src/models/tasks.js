// object structure: {id: number, title: string, description: string, completed: boolean}
const tasksByBoard = new Map();
let nextTaskId = 1;

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
  task.id = nextTaskId++;
  tasksByBoard.get(boardId).push(task);
  return task;
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

function deleteAllTasksForBoard(boardId) {
  const tasks = getTasksByBoard(boardId);
  tasksByBoard.delete(boardId);
  return tasks;
}

module.exports = {
  getTasksByBoard,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasksForBoard,
};
