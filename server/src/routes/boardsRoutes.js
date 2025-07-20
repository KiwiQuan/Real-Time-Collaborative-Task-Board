const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const requireBoard = require("../middleware/requireBoard");

router.get("/", boardsController.getAllBoards);
router.post("/", boardsController.createBoard);
router.get("/:boardId", requireBoard, boardsController.getBoardById);
router.patch("/:boardId", requireBoard, boardsController.updateBoard);
router.delete("/:boardId", requireBoard, boardsController.deleteBoard);

module.exports = router;
