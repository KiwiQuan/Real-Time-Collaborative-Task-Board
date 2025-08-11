import { useContext } from "react";
import { BoardsContext } from "../../contexts/BoardsContext";
import {
  getTaskById as getTaskByIdApi,
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
  deleteAllTasks as deleteAllTasksApi,
} from "../../services/taskApi";

export default function useTasks() {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error("useTasks must be used within a BoardsProvider");
  }
  const { setError, setIsLoading, setBoards } = context;

  async function getTaskById(boardId, taskId) {
    try {
      setError(null);
      setIsLoading(true);
      const task = await getTaskByIdApi(boardId, taskId);
      return task;
    } catch (error) {
      setError(error.message || "Failed to fetch task");
    } finally {
      setIsLoading(false);
    }
  }

  async function createTask(boardId, task) {
    try {
      setError(null);
      setIsLoading(true);
      const newTask = await createTaskApi(boardId, task);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === boardId
            ? { ...board, tasks: [...board.tasks, newTask] }
            : board
        )
      );
      return newTask;
    } catch (error) {
      setError(error.message || "Failed to create task");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateTask(boardId, taskId, task) {
    try {
      setError(null);
      setIsLoading(true);
      const updatedTask = await updateTaskApi(boardId, taskId, task);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === boardId
            ? {
                ...board,
                tasks: board.tasks.map((t) =>
                  t.id === taskId ? updatedTask : t
                ),
              }
            : board
        )
      );
      return updatedTask;
    } catch (error) {
      setError(error.message || "Failed to update task");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteTask(boardId, taskId) {
    try {
      setError(null);
      setIsLoading(true);
      const deletedTask = await deleteTaskApi(boardId, taskId);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === boardId
            ? { ...board, tasks: board.tasks.filter((t) => t.id !== taskId) }
            : board
        )
      );
      return deletedTask.name;
    } catch (error) {
      setError(error.message || "Failed to delete task");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteAllTasks(boardId) {
    try {
      setError(null);
      setIsLoading(true);
      await deleteAllTasksApi(boardId);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === boardId ? { ...board, tasks: [] } : board
        )
      );
    } catch (error) {
      setError(error.message || "Failed to delete all tasks");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
    ...context,
  };
}
