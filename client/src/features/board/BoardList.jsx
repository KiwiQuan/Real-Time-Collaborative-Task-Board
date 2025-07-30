import React from "react";
import useBoards from "./useBoards";
import Board from "./Board";
import Notifications from "../../components/Notifications";

export default function BoardList() {
  const { boards, isLoading, error } = useBoards();
  console.log(boards);
  return (
    <main>
      <Notifications />
      <h1>Boards</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {boards.map((board) => (
          <Board key={board.id} board={board} />
        ))}
      </ul>
    </main>
  );
}
