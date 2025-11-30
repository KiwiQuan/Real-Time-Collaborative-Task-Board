import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import TaskList from "../task/TaskList";
import useBoards from "./useBoards";
import useTasks from "../task/useTasks";
import Notifications from "../../components/Notifications";
import BoardUpdateForm from "./forms/BoardUpdateForm";
import TaskCreateForm from "../task/form/TaskCreateForm";
import PlusSign from "../../assets/PlusSign";
import BackArrow from "../../assets/BackArrow";
import EditIcon from "../../assets/EditIcon";

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
      <div className="board-details-container flex justify-center">
        <div className="board-details flex flex-col gap-8 min-w-[300px] basis-full">
          <header className="board-header flex flex-col gap-4 mx-10 my-7 items-start justify-center">
            <Link
              className="back-to-boards flex items-center hover:bg-gray-200 rounded-md p-2 gap-5 text-sm cursor-pointer"
              to="/"
            >
              <BackArrow className="size-4" /> Back to boards
            </Link>
            <div className="board-header-content flex flex-col w-full justify-center items-center gap-4 sm:items-stretch">
              <div className="board-header-notifications">
                <Notifications />
              </div>

              {connectionLost && (
                <div className="connection-lost text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100">
                  <p className="connection-lost-text">Connection lost</p>
                  <p className="connection-lost-text">
                    Attempting to reconnect...
                  </p>
                </div>
              )}
              <div className="board-header-title-container flex gap-4 justify-center items-center flex-col sm:flex-row sm:justify-between">
                <h1 className="board-header-title text-2xl font-bold">
                  {board.name}
                </h1>
                <div className="board-header-buttons flex gap-4 items-center flex-col sm:flex-row">
                  <button
                    className="showBoardEditModal cursor-pointer flex items-center gap-2 hover:bg-gray-200 rounded-md p-2 text-sm"
                    onClick={() => setShowEditBoardModal(true)}
                  >
                    <EditIcon className="size-5" /> Edit Board
                  </button>
                  <button
                    className="showCreateTaskModal cursor-pointer flex items-center gap-4 text-white bg-black rounded-md px-3 py-2 text-sm hover:bg-gray-900"
                    onClick={() => setShowCreateTaskModal(true)}
                  >
                    <PlusSign className="size-5" /> <span>Add Task</span>
                  </button>
                </div>
              </div>
              <textarea
                readOnly
                className="board-header-description self-start text-gray-500 resize-none focus:outline-none"
                rows={2}
              >
                {board.description}
              </textarea>
              <p className="text-gray-500 self-start">{tasks.length} tasks</p>

              {showEditBoardModal && (
                <BoardUpdateForm
                  board={board}
                  setShowEditBoardModal={setShowEditBoardModal}
                  error={error}
                  updateBoard={updateBoard}
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
        </div>
      </div>
    </>
  );
}
