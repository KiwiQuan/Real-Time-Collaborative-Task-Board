const boardsModel = require("../models/boards");
const tasksModel = require("../models/tasks");
const {
  addSubscriber,
  removeSubscriber,
} = require("../models/boardSubscribers");
const { broadcastToBoard } = require("../utiles/broadcastToBoard");

function getAllBoards(req, res) {
  const boards = boardsModel.getBoards();
  res.status(200).json(boards);
}

function getBoardById(req, res) {
  res.status(200).json(req.board);
}

function createBoard(req, res) {
  if (req.body.id) {
    return res.status(400).json({ error: "Cannot create board with ID" });
  }
  const board = boardsModel.createBoard(req.body);
  tasksModel.initTasksForBoard(board.id);
  broadcastToBoard(board.id, "boardCreated", board);
  res.status(200).json(board);
}

function updateBoard(req, res) {
  const updates = req.body;
  if (updates.id) {
    return res.status(400).json({ error: "Cannot update board ID" });
  }
  const updatedBoard = boardsModel.updateBoard(req.board.id, updates);
  broadcastToBoard(req.board.id, "boardUpdated", updatedBoard);
  res.status(200).json(updatedBoard);
}

function deleteBoard(req, res) {
  const deletedBoard = boardsModel.deleteBoard(req.board.id);
  tasksModel.deleteAllTasksForBoard(req.board.id);
  broadcastToBoard(req.board.id, "boardDeleted", deletedBoard);
  res.status(200).json(deletedBoard);
}

function streamBoard(req, res) {
  const heartBeat = setInterval(() => {
    res.write(":heartbeat\n\n");
  }, 30000);

  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  addSubscriber(req.board.id, res);

  req.on("close", () => {
    removeSubscriber(req.board.id, res);
    clearInterval(heartBeat);
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
