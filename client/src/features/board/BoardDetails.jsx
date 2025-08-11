import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import TaskList from "../task/TaskList";
import useBoards from "./useBoards";
import useTasks from "../task/useTasks";
import Notifications from "../../components/Notifications";
import ModalOverlay from "../../components/ModalOverlay";
import BoardUpdateForm from "./forms/BoardUpdateForm";

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
  const { createTask } = useTasks();

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
    <main>
      <Notifications />
      {connectionLost && (
        <div className="connection-lost">
          <p>Connection lost</p>
          <p>Attempting to reconnect...</p>
        </div>
      )}
      <h1>{board.name}</h1>
      <p>{board.description}</p>
      <button onClick={() => setShowEditBoardModal(true)}>Edit Board</button>
      {showEditBoardModal && (
        <BoardUpdateForm
          board={board}
          setShowEditBoardModal={setShowEditBoardModal}
          error={error}
          updateBoard={updateBoard}
          setShowCreateTaskModal={setShowCreateTaskModal}
          showCreateTaskModal={showCreateTaskModal}
          createTask={createTask}
          deleteBoard={deleteBoard}
        />
      )}
      <Link to="/">Back to boards</Link>
      {tasks?.length > 0 && <TaskList tasks={tasks} boardId={board.id} />}
    </main>
  );
}
