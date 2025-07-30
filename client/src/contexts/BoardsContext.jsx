import { createContext, useState, useEffect } from "react";
import {
  getBoards as getBoardsApi,
  getBoard as getBoardApi,
  createBoard as createBoardApi,
  updateBoard as updateBoardApi,
  deleteBoard as deleteBoardApi,
} from "../services/boardApi";

const BoardsContext = createContext();

function BoardsProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getBoards();
  }, []);

  useEffect(() => {
    if (!activeBoardId) return;
    const eventSource = new EventSource(
      `http://localhost:3000/boards/${activeBoardId}/stream`
    );

    eventSource.addEventListener("boardDeleted", (event) => {
      const data = JSON.parse(event.data);
      setBoards((prevBoards) =>
        prevBoards.filter((board) => board.id !== data.id)
      );
      setNotification(`Board "${data.name}" was deleted by another user`);
    });

    eventSource.addEventListener("boardUpdated", (event) => {
      const data = JSON.parse(event.data);
      setBoards((prevBoards) =>
        prevBoards.map((board) => (board.id === data.id ? data : board))
      );
      setNotification(
        `This board was updated by another user, you may need to refresh to see the changes`
      );
    });
    console.log("board details rendered");
    return () => eventSource.close();
  }, [activeBoardId]);

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

  return (
    <BoardsContext.Provider
      value={{
        boards,
        setActiveBoardId,
        isLoading,
        error,
        getBoards,
        getBoard,
        createBoard,
        updateBoard,
        deleteBoard,
        notification,
        setNotification,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
}

export { BoardsProvider, BoardsContext };
