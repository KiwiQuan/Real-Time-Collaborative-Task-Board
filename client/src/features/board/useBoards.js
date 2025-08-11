import { useContext } from "react";
import { BoardsContext } from "../../contexts/BoardsContext";
import {
  getBoard as getBoardApi,
  createBoard as createBoardApi,
  updateBoard as updateBoardApi,
  deleteBoard as deleteBoardApi,
} from "../../services/boardApi";

export default function useBoards() {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error("useBoards must be used within a BoardsProvider");
  }
  const { setBoards, setError, setIsLoading, setNotification, boards } =
    context;

  async function getBoard(id) {
    try {
      setError(null);
      setIsLoading(true);
      const board = await getBoardApi(id);
      return board;
    } catch (error) {
      setError(error.message || "Failed to fetch board");
    } finally {
      setIsLoading(false);
    }
  }

  async function createBoard(board) {
    try {
      setError(null);
      setIsLoading(true);
      const newBoard = await createBoardApi(board);
      newBoard.tasks = [];
      setBoards((prevBoards) => [...prevBoards, newBoard]);
      if (newBoard) {
        setNotification(`Board "${newBoard.name}" created`);
      }
      return newBoard;
    } catch (error) {
      setError(error.message || "Failed to create board");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateBoard(id, updates) {
    try {
      setError(null);
      setIsLoading(true);
      const updatedBoard = await updateBoardApi(id, updates);
      const tasks = boards.find((board) => board.id === id).tasks;
      updatedBoard.tasks = tasks;
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board
        )
      );
      if (updatedBoard) {
        setNotification(`Board "${updatedBoard.name}" updated`);
      }
      return updatedBoard;
    } catch (error) {
      setError(error.message || "Failed to update board");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteBoard(id) {
    try {
      setError(null);
      setIsLoading(true);
      const deletedBoard = await deleteBoardApi(id);
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
      if (deletedBoard) {
        setNotification(`Board "${deletedBoard.name}" deleted`);
      }
      return deletedBoard.name;
    } catch (error) {
      setError(error.message || "Failed to delete board");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    getBoard,
    createBoard,
    updateBoard,
    deleteBoard,
    ...context,
  };
}
