const boards = [];

function getBoards() {
  return boards;
}

function createBoard(board) {
  boards.push(board);
  return board;
}

function getBoardById(boardId) {
  return boards.find((board) => board.id === boardId);
}

module.exports = {
  getBoards,
  createBoard,
  getBoardById,
};
