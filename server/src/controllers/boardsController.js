const boardsModel = require("../models/boards");
const tasksModel = require("../models/tasks");

function getAllBoards(req, res) {
  const boards = boardsModel.getBoards();
  res.json(boards);
}

function getBoardById(req, res) {
  res.json(req.board);
}

function createBoard(req, res) {
  if (req.body.id) {
    return res.status(400).json({ error: "Cannot create board with ID" });
  }
  const board = boardsModel.createBoard(req.body);
  tasksModel.initTasksForBoard(board.id);
  res.status(201).json(board);
}

function updateBoard(req, res) {
  const updates = req.body;
  if (updates.id) {
    return res.status(400).json({ error: "Cannot update board ID" });
  }
  const updatedBoard = boardsModel.updateBoard(req.board.id, updates);
  res.json(updatedBoard);
}

function deleteBoard(req, res) {
  const deletedBoard = boardsModel.deleteBoard(req.board.id);
  res.json(deletedBoard);
}

module.exports = {
  getAllBoards,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
};
