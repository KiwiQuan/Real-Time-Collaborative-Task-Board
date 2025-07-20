const boardsModel = require("../models/boards");

function requireBoard(req, res, next) {
  const boardId = parseInt(req.params.boardId);
  const board = boardsModel.getBoardById(boardId);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }
  req.board = board;
  next();
}

module.exports = requireBoard;
