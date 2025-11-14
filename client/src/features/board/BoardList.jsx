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
      <header className="boardHeader flex flex-col shadow items-center basis-1/4 gap-4 py-6 mb-5 bg-gray-50 border-b border-gray-200">
        <Notifications />
        <h1 className="text-4xl font-bold">Boards</h1>
        <button
          className="showCreateBoardModal rounded-lg text-black text-base px-5 py-5 bg-blue-300 font-medium shadow hover:bg-blue-200 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 transition delay-100 duration-250 ease-in-out"
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
      <main className="boardContent flex basis-full">
        <ul className="boardList flex flex-col gap-4 mx-5 w-full">
          {boards.map((board) => (
            <Board key={board.id} board={board} />
          ))}
        </ul>
      </main>
    </>
  );
}
