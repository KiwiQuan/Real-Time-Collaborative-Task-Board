import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import useBoards from "./useBoards";
import useBoardSSE from "./useBoardSSE";

export default function BoardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { boards, updateBoard, deleteBoard } = useBoards();
  const [notification, setNotification] = useState("");
  const board = boards.find((board) => board.id === Number(id));

  function onBoardDeleted(data) {
    setNotification(`This board was deleted by another user`);
    deleteBoard(data.id);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }

  function onBoardUpdated(data) {
    setNotification(
      `This board was updated by another user, refresh to see the changes`
    );
    updateBoard(data.id, data);
  }

  useBoardSSE(id, {
    onBoardDeleted,
    onBoardUpdated,
  });

  if (!board) {
    return <p>Board not found</p>;
  }

  return (
    <main>
      {notification && <p className="notification">{notification}</p>}
      <h1>{board.name}</h1>
      <p>{board.description}</p>
    </main>
  );
}
