import React from "react";
import ModalOverlay from "../../../components/ModalOverlay";
import TaskCreateForm from "../../task/form/TaskCreateForm";

export default function BoardUpdateForm({
  board,
  setShowEditBoardModal,
  setShowCreateTaskModal,
  error,
  updateBoard,
  showCreateTaskModal,
  createTask,
  deleteBoard,
}) {
  async function handleUpdateBoard(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");

    const updates = {
      ...(name && { name }),
      ...(description && { description }),
    };
    setShowEditBoardModal(false);
    try {
      await updateBoard(board.id, updates);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ModalOverlay onClose={() => setShowEditBoardModal(false)}>
      {error && <p>{error}</p>}
      <form onSubmit={handleUpdateBoard}>
        <label>
          <input type="text" placeholder={board.name} name="name" />
        </label>
        <label>
          <input
            type="text"
            placeholder={board.description}
            name="description"
          />
        </label>
        <button type="submit">Update Board</button>
      </form>
      <button onClick={() => setShowCreateTaskModal(true)}>Create Task</button>
      {showCreateTaskModal && (
        <TaskCreateForm
          setShowCreateTaskModal={setShowCreateTaskModal}
          createTask={createTask}
          board={board}
        />
      )}
      <button onClick={() => deleteBoard(board.id)}>Delete Board</button>
    </ModalOverlay>
  );
}
