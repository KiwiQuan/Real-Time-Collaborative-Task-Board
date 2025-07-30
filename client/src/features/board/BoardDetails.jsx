import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import useBoards from "./useBoards";
import Notifications from "../../components/Notifications";

export default function BoardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { boards, setActiveBoardId, isLoading } = useBoards();
  const board = boards.find((board) => board.id === Number(id));

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
      </main>
    );
  }

  return (
    <main>
      <Notifications />
      <h1>{board.name}</h1>
      <p>{board.description}</p>
    </main>
  );
}
