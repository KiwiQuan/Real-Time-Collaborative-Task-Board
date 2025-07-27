const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const boardsRoutes = require("./routes/boardsRoutes");
const tasksRoutes = require("./routes/tasksRoutes");
const validateRequest = require("./middleware/validateRequests");
const { boardIdSchema } = require("../validationSchemas.js/boardsSchema");

app.use(express.json());
app.use(cors());
app.use("/boards", boardsRoutes);
app.use(
  "/boards/:boardId/tasks",
  validateRequest({ params: boardIdSchema }),
  tasksRoutes
);

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
