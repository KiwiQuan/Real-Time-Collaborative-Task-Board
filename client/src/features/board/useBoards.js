import { useContext } from "react";
import { BoardsContext } from "../../contexts/BoardsContext";

export default function useBoards() {
  const context = useContext(BoardsContext);
  if (!context) {
    throw new Error("useBoards must be used within a BoardsProvider");
  }
  return context;
}
