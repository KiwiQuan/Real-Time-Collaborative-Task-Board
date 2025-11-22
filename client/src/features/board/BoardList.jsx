import { useEffect, useState } from "react";
import useBoards from "./useBoards";
import Board from "./Board";
import Notifications from "../../components/Notifications";
import BoardCreateForm from "./forms/BoardCreateForm";
import PlusSign from "../../assets/PlusSign";

export default function BoardList() {
  const { boards, isLoading, error, createBoard, deleteBoard, getBoards } =
    useBoards();
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <header className="boardHeader flex justify-around shadow items-center basis-1/4 gap-4 py-6 mb-5 bg-gray-50 border-b border-gray-200">
        <Notifications />
        <div className="boardCount text-lg font-medium">
          <h1 className="text-4xl font-bold">My Boards</h1>
          <p className="text-gray-500">{boards.length} boards</p>
        </div>
        <button
          className="showCreateBoardModal flex items-center gap-2 rounded-lg text-white text-base px-5 py-2 bg-black font-medium shadow hover:bg-gray-800 hover:scale-105 cursor-pointer focus:outline-none transition delay-100 duration-250 ease-in-out"
          onClick={() => setShowCreateBoardModal(true)}
        >
          <PlusSign className="size-5" /> New Board
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
        <ul className="boardList grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-7 grow">
          {boards.map((board) => (
            <Board
              key={board.id}
              board={board}
              deleteBoard={deleteBoard}
              getBoards={getBoards}
            />
          ))}
        </ul>
      </main>
    </>
  );
}
