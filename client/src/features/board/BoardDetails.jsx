import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import TaskList from "../task/TaskList";
import useBoards from "./useBoards";
import useTasks from "../task/useTasks";
import Notifications from "../../components/Notifications";
import BoardUpdateForm from "./forms/BoardUpdateForm";
import TaskCreateForm from "../task/form/TaskCreateForm";

export default function BoardDetails() {
  useEffect(() => {
    console.log("board details mounted");

    return () => {
      console.log("board details unmounted");
    };
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    boards,
    setActiveBoardId,
    isLoading,
    error,
    connectionLost,
    deleteBoard,
    updateBoard,
    getBoards,
  } = useBoards();
  const { createTask, deleteAllTasks } = useTasks();

  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showEditBoardModal, setShowEditBoardModal] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      setBoard(boards.find((board) => board.id === Number(id)));
      setTasks(boards.find((board) => board.id === Number(id))?.tasks || []);
    }
  }, [boards, board, isLoading]);

  useEffect(() => {
    setActiveBoardId(Number(id));

    return () => {
      setActiveBoardId(null);
    };
  }, [id]);

  useEffect(() => {
    console.log(isLoading);

    console.log(board);
  }, [isLoading, board, tasks]);

  useEffect(() => {
    if (!isLoading && !board) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isLoading, board, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!board) {
    return (
      <main>
        <Notifications />
        <p>Board not found</p>
        <Link to="/">Back to boards</Link>
      </main>
    );
  }

  if (connectionLost) {
    getBoards();
  }

  return (
    <>
      <header className="board-header flex flex-col gap-4 grow">
        <div className="board-header-content flex flex-col gap-4 items-center grow">
          <div className="board-header-notifications">
            <Notifications />
          </div>

          {connectionLost && (
            <div className="connection-lost text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100">
              <p className="connection-lost-text">Connection lost</p>
              <p className="connection-lost-text">Attempting to reconnect...</p>
            </div>
          )}
          <h1 className="board-header-title text-2xl font-bold">
            {board.name}
          </h1>
          <textarea
            readOnly
            className="board-header-description bg-gray-100 w-250 h-100 resize-none focus:outline-none rounded-md p-2 border border-gray-300"
          >
            {board.description}
          </textarea>
          <div className="board-header-buttons flex gap-4">
            <button
              className="showBoardEditModal cursor-pointer"
              onClick={() => setShowEditBoardModal(true)}
            >
              Edit Board
            </button>
            <Link className="back-to-boards" to="/">
              Back to boards
            </Link>
          </div>
          {showEditBoardModal && (
            <BoardUpdateForm
              board={board}
              setShowEditBoardModal={setShowEditBoardModal}
              error={error}
              updateBoard={updateBoard}
              setShowCreateTaskModal={setShowCreateTaskModal}
              deleteBoard={deleteBoard}
              deleteAllTasks={deleteAllTasks}
            />
          )}
          {showCreateTaskModal && (
            <TaskCreateForm
              setShowEditBoardModal={setShowEditBoardModal}
              setShowCreateTaskModal={setShowCreateTaskModal}
              createTask={createTask}
              board={board}
            />
          )}
        </div>
      </header>
      <main className="taskList flex flex-col gap-4 grow">
        {tasks?.length > 0 && <TaskList tasks={tasks} boardId={board.id} />}
      </main>
    </>
  );
}
