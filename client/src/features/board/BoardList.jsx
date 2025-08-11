import { useEffect, useState } from "react";
import useBoards from "./useBoards";
import Board from "./Board";
import Notifications from "../../components/Notifications";
import BoardCreateForm from "./forms/BoardCreateForm";

export default function BoardList() {
  useEffect(() => {
    console.log("BoardList mounted");

    return () => {
      console.log("BoardList unmounted");
    };
  }, []);
  const { boards, isLoading, error, createBoard } = useBoards();
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(boards);

  return (
    <main>
      <Notifications />
      <h1>Boards</h1>
      <button onClick={() => setShowCreateBoardModal(true)}>
        Create Board
      </button>
      {showCreateBoardModal && (
        <BoardCreateForm
          setShowCreateBoardModal={setShowCreateBoardModal}
          createBoard={createBoard}
        />
      )}
      {error && <p>{error}</p>}
      <ul>
        {boards.map((board) => (
          <Board key={board.id} board={board} />
        ))}
      </ul>
    </main>
  );
}
