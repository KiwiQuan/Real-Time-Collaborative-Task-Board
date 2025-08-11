import { createContext, useState, useEffect, useRef } from "react";
import { getBoards as getBoardsApi } from "../services/boardApi";
import { getTasks as getTasksApi } from "../services/taskApi";

const BoardsContext = createContext();

function BoardsProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [connectionLost, setConnectionLost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const boardsRef = useRef(boards);
  useEffect(() => {
    boardsRef.current = boards;
  }, [boards]);

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
      const board = boardsRef.current.find((board) => board.id === data.id);
      if (!board) {
        console.warn(
          "Board not found for SSE update:",
          data.id,
          boardsRef.current
        );
        return;
      }
      const tasks = board ? board.tasks : [];
      data.tasks = tasks;
      setBoards((prevBoards) =>
        prevBoards.map((board) => (board.id === data.id ? data : board))
      );
      setNotification(
        `This board was updated by another user, you may need to refresh to see the changes`
      );
    });

    eventSource.addEventListener("taskDeleted", (event) => {
      const data = JSON.parse(event.data);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === activeBoardId
            ? {
                ...board,
                tasks: board.tasks.filter((task) => task.id !== data.id),
              }
            : board
        )
      );
      setNotification(`Task "${data.title}" was deleted by another user`);
    });

    eventSource.addEventListener("taskCreated", (event) => {
      const data = JSON.parse(event.data);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === activeBoardId
            ? { ...board, tasks: [...board.tasks, data] }
            : board
        )
      );
      setNotification(`Task "${data.title}" was created by another user`);
    });

    eventSource.addEventListener("taskUpdated", (event) => {
      const data = JSON.parse(event.data);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === activeBoardId
            ? {
                ...board,
                tasks: board.tasks.map((task) =>
                  task.id === data.id ? data : task
                ),
              }
            : board
        )
      );
      setNotification(`Task "${data.title}" was updated by another user`);
    });

    eventSource.addEventListener("allTasksDeleted", (event) => {
      const data = JSON.parse(event.data);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === activeBoardId ? { ...board, tasks: [] } : board
        )
      );
      setNotification(data.message);
    });

    eventSource.addEventListener("open", () => {
      setConnectionLost(false);
    });

    eventSource.addEventListener("error", (e) => {
      if (eventSource.readyState === 2) {
        setConnectionLost(true);
      }
    });

    console.log("board broadcast event source connected");
    return () => eventSource.close();
  }, [activeBoardId]);

  useEffect(() => {
    getBoards();
  }, []);

  async function getBoards() {
    try {
      setError(null);
      setIsLoading(true);
      const boards = await getBoardsApi();
      setBoards(boards);
      await Promise.all(boards.map((board) => getTasks(board.id)));
      return boards;
    } catch (error) {
      setError(error.message || "Failed to fetch boards");
    } finally {
      setIsLoading(false);
    }
  }

  async function getTasks(boardId) {
    try {
      setError(null);
      setIsLoading(true);
      const tasks = await getTasksApi(boardId);
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === boardId ? { ...board, tasks: tasks || [] } : board
        )
      );
      return tasks;
    } catch (error) {
      setError(error.message || "Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BoardsContext.Provider
      value={{
        boards,

        getBoards,
        setBoards,
        setActiveBoardId,
        isLoading,
        error,
        setError,
        setIsLoading,
        notification,
        setNotification,
        connectionLost,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
}

export { BoardsProvider, BoardsContext };
