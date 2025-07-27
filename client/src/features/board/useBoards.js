import { useState, useEffect } from "react";
import {
  getBoards as getBoardsApi,
  getBoard as getBoardApi,
  createBoard as createBoardApi,
  updateBoard as updateBoardApi,
  deleteBoard as deleteBoardApi,
} from "../../services/boardApi";

export default function useBoards() {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getBoards();
  }, []);
  async function getBoards() {
    try {
      setError(null);
      setIsLoading(true);
      const boards = await getBoardsApi();
      setBoards(boards);
      return boards;
    } catch (error) {
      setError(error.message || "Failed to fetch boards");
    } finally {
      setIsLoading(false);
    }
  }
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
      setBoards((prevBoards) => [...prevBoards, newBoard]);
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
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board
        )
      );

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
      return deletedBoard.name;
    } catch (error) {
      setError(error.message || "Failed to delete board");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    boards,
    isLoading,
    error,
    getBoards,
    getBoard,
    createBoard,
    updateBoard,
    deleteBoard,
  };
}
