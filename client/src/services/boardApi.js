const BASE_URL = "http://localhost:3000";
const headers = {
  "Content-Type": "application/json",
};

export async function getBoards() {
  const response = await fetch(`${BASE_URL}/boards`);
  if (!response.ok) {
    throw new Error("Failed to get boards");
  }
  console.log(response);
  return response.json();
}

export async function getBoard(id) {
  const response = await fetch(`${BASE_URL}/boards/${id}`);
  if (!response.ok) {
    throw new Error("Failed to get board");
  }
  console.log(response);
  return response.json();
}

export async function createBoard(board) {
  const response = await fetch(`${BASE_URL}/boards`, {
    method: "POST",
    headers,
    body: JSON.stringify(board),
  });
  if (!response.ok) {
    throw new Error("Failed to create board");
  }
  console.log(response);
  return response.json();
}
export async function updateBoard(id, updates) {
  const response = await fetch(`${BASE_URL}/boards/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error("Failed to update board");
  }
  console.log(response);
  return response.json();
}

export async function deleteBoard(id) {
  const response = await fetch(`${BASE_URL}/boards/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) {
    throw new Error("Failed to delete board");
  }
  console.log(response);
  return response.json();
}
