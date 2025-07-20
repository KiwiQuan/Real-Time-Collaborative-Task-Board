const express = require("express");
const router = express.Router({ mergeParams: true });
const tasksController = require("../controllers/tasksController");
const requireBoard = require("../middleware/requireBoard");
const requireTask = require("../middleware/requireTask");

router.use(requireBoard);

router.get("/", tasksController.getTasksByBoard);
router.post("/", tasksController.createTask);
router.delete("/", tasksController.deleteAllTasksForBoard);
router.get("/:taskId", requireTask, tasksController.getTaskById);
router.patch("/:taskId", requireTask, tasksController.updateTask);
router.delete("/:taskId", requireTask, tasksController.deleteTask);

module.exports = router;
