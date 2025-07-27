const BASE_URL = "http://localhost:3000";
const headers = {
  "Content-Type": "application/json",
};

export async function getTasks(boardId) {
  const response = await fetch(`${BASE_URL}/boards/${boardId}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to get tasks");
  }
  console.log(response);
  return response.json();
}

export async function getTaskById(boardId, taskId) {
  const response = await fetch(`${BASE_URL}/boards/${boardId}/tasks/${taskId}`);
  if (!response.ok) {
    throw new Error("Failed to get task");
  }
  console.log(response);
  return response.json();
}

export async function createTask(boardId, task) {
  const response = await fetch(`${BASE_URL}/boards/${boardId}/tasks`, {
    method: "POST",
    headers,
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Failed to create task");
  }
  console.log(response);
  return response.json();
}

export async function updateTask(boardId, taskId, task) {
  const response = await fetch(
    `${BASE_URL}/boards/${boardId}/tasks/${taskId}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify(task),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  console.log(response);
  return response.json();
}

export async function deleteTask(boardId, taskId) {
  const response = await fetch(
    `${BASE_URL}/boards/${boardId}/tasks/${taskId}`,
    {
      method: "DELETE",
      headers,
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
  console.log(response);
  return response.json();
}

export async function deleteAllTasks(boardId) {
  const response = await fetch(`${BASE_URL}/boards/${boardId}/tasks`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) {
    throw new Error("Failed to delete all tasks");
  }
  console.log(response);
  return response.json();
}
