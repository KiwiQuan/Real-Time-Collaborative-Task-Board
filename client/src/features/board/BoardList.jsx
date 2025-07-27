import React from "react";
import useBoards from "./useBoards";
import Board from "./Board";

export default function BoardList() {
  const { boards, isLoading, error, getBoards } = useBoards();
  console.log(boards);
  return (
    <main>
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
