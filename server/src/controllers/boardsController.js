const boardsModel = require("../models/boards");
const tasksModel = require("../models/tasks");
const {
  addSubscriber,
  removeSubscriber,
} = require("../models/boardSubscribers");
const { broadcastToBoard } = require("../utiles/broadcastToBoard");

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
  tasksModel.deleteAllTasksForBoard(req.board.id);
  broadcastToBoard(req.board.id, "boardDeleted", deletedBoard);
  res.status(200).json(deletedBoard);
}

function streamBoard(req, res) {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  addSubscriber(req.board.id, res);

  req.on("close", () => {
    removeSubscriber(req.board.id, res);
    res.end();
  });
}

module.exports = {
  getAllBoards,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
  streamBoard,
};
