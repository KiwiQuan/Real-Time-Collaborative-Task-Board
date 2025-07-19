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
  if (req.body.id) {
    return res.status(400).json({ error: "Cannot create board with ID" });
  }
  const board = boardsModel.createBoard(req.body);
  res.status(201).json(board);
}

function updateBoard(req, res) {
  const boardId = parseInt(req.params.boardId);
  const updates = req.body;
  if (updates.id) {
    return res.status(400).json({ error: "Cannot update board ID" });
  }
  const updatedBoard = boardsModel.updateBoard(boardId, updates);
  if (updatedBoard) {
    res.json(updatedBoard);
  } else {
    res.status(404).json({ error: "Board not found" });
  }
}

function deleteBoard(req, res) {
  const boardId = parseInt(req.params.boardId);
  const deletedBoard = boardsModel.deleteBoard(boardId);
  if (deletedBoard) {
    res.json(deletedBoard);
  } else {
    res.status(404).json({ error: "Board not found" });
  }
}

module.exports = {
  getAllBoards,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
};
