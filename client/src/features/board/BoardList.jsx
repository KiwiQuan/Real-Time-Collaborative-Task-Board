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
    <>
      <header className="boardHeader">
        <Notifications />
        <h1>Boards</h1>
        <button
          className="showCreateBoardModal"
          onClick={() => setShowCreateBoardModal(true)}
        >
          Create Board
        </button>
        {showCreateBoardModal && (
          <BoardCreateForm
            setShowCreateBoardModal={setShowCreateBoardModal}
            createBoard={createBoard}
          />
        )}
        {error && <p className="boardError">{error}</p>}
      </header>
      <main className="boardContent">
        <ul className="boardList">
          {boards.map((board) => (
            <Board key={board.id} board={board} />
          ))}
        </ul>
      </main>
    </>
  );
}
