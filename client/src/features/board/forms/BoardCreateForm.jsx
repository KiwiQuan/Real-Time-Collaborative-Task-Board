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
      <h2>Create Board</h2>
      <form onSubmit={handleCreateBoard}>
        <input type="text" placeholder="Board Name" name="name" required />
        <input
          type="text"
          placeholder="Board Description"
          name="description"
          required
        />
        <button type="submit">Create Board</button>
      </form>
    </ModalOverlay>
  );
}
