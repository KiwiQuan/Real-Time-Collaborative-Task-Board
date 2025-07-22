const express = require("express");
const router = express.Router({ mergeParams: true });
const tasksController = require("../controllers/tasksController");
const requireBoard = require("../middleware/requireBoard");
const requireTask = require("../middleware/requireTask");
const validateRequest = require("../middleware/validateRequests");
const {
  taskIdSchema,
  taskCreateSchema,
  taskUpdateSchema,
} = require("../../validationSchemas.js/tasksSchema");

router.use(requireBoard);

router.get("/", tasksController.getTasksByBoard);
router.post(
  "/",
  validateRequest({ body: taskCreateSchema }),
  tasksController.createTask
);
router.delete("/", tasksController.deleteAllTasksForBoard);
router.get(
  "/:taskId",
  validateRequest({ params: taskIdSchema }),
  requireTask,
  tasksController.getTaskById
);
router.patch(
  "/:taskId",
  validateRequest({ params: taskIdSchema, body: taskUpdateSchema }),
  requireTask,
  tasksController.updateTask
);
router.delete(
  "/:taskId",
  validateRequest({ params: taskIdSchema }),
  requireTask,
  tasksController.deleteTask
);

module.exports = router;
