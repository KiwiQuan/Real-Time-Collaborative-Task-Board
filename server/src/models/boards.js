// object structure: {id: number, name: string, description: string}
const boards = [];
let nextBoardId = 1;

function getBoards() {
  return boards;
}

function createBoard(board) {
  board.id = nextBoardId++;
  boards.push(board);
  return board;
}

function deleteBoard(boardId) {
  const index = boards.findIndex((board) => board.id === boardId);
  if (index !== -1) {
    const [deletedBoard] = boards.splice(index, 1);
    return deletedBoard;
  }
  return null;
}

function updateBoard(boardId, updates) {
  const board = getBoardById(boardId);
  if (board) {
    Object.assign(board, updates);
    return board;
  }
  return null;
}

function getBoardById(boardId) {
  return boards.find((board) => board.id === boardId);
}

module.exports = {
  getBoards,
  createBoard,
  getBoardById,
  deleteBoard,
  updateBoard,
};
