const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");

router.get("/", boardsController.getAllBoards);
router.post("/", boardsController.createBoard);
router.get("/:boardId", boardsController.getBoardById);
router.patch("/:boardId", boardsController.updateBoard);
router.delete("/:boardId", boardsController.deleteBoard);

module.exports = router;
