const boardsModel = require("../models/boards");

function getAllBoards(req, res) {
  const boards = boardsModel.getBoards();
  res.json(boards);
}

function getBoardById(req, res) {
  const boardId = parseInt(req.params.boardId);
  const board = boardsModel.getBoardById(boardId);
  if (board) {
    res.json(board);
  } else {
    res.status(404).json({ error: "Board not found" });
  }
}

function createBoard(req, res) {
  const board = boardsModel.createBoard(req.body);
  res.status(201).json(board);
}

module.exports = {
  getAllBoards,
  createBoard,
  getBoardById,
};
