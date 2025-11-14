import React from "react";
import ModalOverlay from "../../../components/ModalOverlay";

export default function BoardCreateForm({
  setShowCreateBoardModal,
  createBoard,
}) {
  async function handleCreateBoard(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");
    const board = { name, description };
    setShowCreateBoardModal(false);
    try {
      await createBoard(board);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ModalOverlay onClose={() => setShowCreateBoardModal(false)}>
      <div className="boardModalContent">
        <h2 className="createBoardTitle">Create Board</h2>
        <form className="boardCreateForm" onSubmit={handleCreateBoard}>
          <input
            className="boardName"
            type="text"
            placeholder="Board Name"
            name="name"
            required
          />
          <input
            className="boardDescription"
            type="text"
            placeholder="Board Description"
            name="description"
            required
          />
          <button className="createBoard" type="submit">
            Create Board
          </button>
        </form>
      </div>
    </ModalOverlay>
  );
}
