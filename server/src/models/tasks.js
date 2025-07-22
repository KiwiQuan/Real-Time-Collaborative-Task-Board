let nextTaskId = 1;
// object structure: {id: number, title: string, description: string, completed: boolean}
const tasksByBoard = new Map();
tasksByBoard.set(1, [
  {
    id: nextTaskId++,
    title: "Task 1",
    description: "Description 1",
    completed: false,
  },
  {
    id: nextTaskId++,
    title: "Task 2",
    description: "Description 2",
    completed: false,
  },
  {
    id: nextTaskId++,
    title: "Task 3",
    description: "Description 3",
    completed: false,
  },
]);
tasksByBoard.set(2, [
  {
    id: nextTaskId++,
    title: "Task 4",
    description: "Description 4",
    completed: false,
  },
  {
    id: nextTaskId++,
    title: "Task 5",
    description: "Description 5",
    completed: false,
  },
  {
    id: nextTaskId++,
    title: "Task 6",
    description: "Description 6",
    completed: true,
  },
]);
tasksByBoard.set(3, [
  {
    id: nextTaskId++,
    title: "Task 7",
    description: "Description 7",
    completed: false,
  },
]);

function getTasksByBoard(boardId) {
  return tasksByBoard.get(boardId) || [];
}

function getTaskById(boardId, taskId) {
  const tasks = getTasksByBoard(boardId);
  return tasks.find((t) => t.id === taskId);
}

function initTasksForBoard(boardId) {
  if (!tasksByBoard.has(boardId)) {
    tasksByBoard.set(boardId, []);
  }
}

function createTask(boardId, task) {
  initTasksForBoard(boardId);
  const tasks = getTasksByBoard(boardId);
  task.id = nextTaskId++;
  task.completed = task.completed || false;
  tasks.push(task);
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
  initTasksForBoard,
};
