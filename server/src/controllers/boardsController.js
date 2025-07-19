const boardsModel = require("../models/boards");

function getAllBoards(req, res) {
  const boards = boardsModel.getBoards();
  res.json(boards);
}

function createBoard(req, res) {
  const board = boardsModel.createBoard(req.body);
  res.status(201).json(board);
}

module.exports = {
  getAllBoards,
  createBoard,
};
