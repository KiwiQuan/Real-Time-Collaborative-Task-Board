const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const requireBoard = require("../middleware/requireBoard");
const validateRequest = require("../middleware/validateRequests");
const {
  boardCreateSchema,
  boardIdSchema,
  boardUpdateSchema,
} = require("../../validationSchemas.js/boardsSchema");

router.get("/", boardsController.getAllBoards);
router.post(
  "/",
  validateRequest({ body: boardCreateSchema }),
  boardsController.createBoard
);
router.get(
  "/:boardId",
  validateRequest({ params: boardIdSchema }),
  requireBoard,
  boardsController.getBoardById
);
router.patch(
  "/:boardId",
  validateRequest({ params: boardIdSchema, body: boardUpdateSchema }),
  requireBoard,
  boardsController.updateBoard
);
router.delete(
  "/:boardId",
  validateRequest({ params: boardIdSchema }),
  requireBoard,
  boardsController.deleteBoard
);

router.get(
  "/:boardId/stream",
  validateRequest({ params: boardIdSchema }),
  requireBoard,
  boardsController.streamBoard
);

module.exports = router;
