import React from "react";
import ModalOverlay from "../../../components/ModalOverlay";
import { useState } from "react";

export default function BoardUpdateForm({
  board,
  setShowEditBoardModal,
  setShowCreateTaskModal,
  error,
  updateBoard,

  deleteBoard,
  deleteAllTasks,
}) {
  const [showDeleteAllTasksModal, setShowDeleteAllTasksModal] = useState(false);
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
    <>
      <ModalOverlay onClose={() => setShowEditBoardModal(false)}>
        {error && <p>{error}</p>}
        <form className="boardUpdateForm" onSubmit={handleUpdateBoard}>
          <label>
            <input
              className="boardName"
              type="text"
              placeholder={board.name}
              name="name"
            />
          </label>
          <label>
            <input
              className="boardDescription"
              type="text"
              placeholder={board.description}
              name="description"
            />
          </label>
          <button className="updateBoard" type="submit">
            Update Board
          </button>
        </form>
        <button
          className="showCreateTaskModal"
          onClick={() => setShowCreateTaskModal(true)}
        >
          Create Task
        </button>

        <button className="deleteBoard" onClick={() => deleteBoard(board.id)}>
          Delete Board
        </button>
        <button
          className="showDeleteAllTasksModal"
          onClick={() => setShowDeleteAllTasksModal(true)}
        >
          Delete All Tasks
        </button>
        {showDeleteAllTasksModal && (
          <ModalOverlay onClose={() => setShowDeleteAllTasksModal(false)}>
            <p className="confirmationMessage">
              Are you sure you want to delete all tasks?
            </p>
            <button
              className="deleteAllTasks"
              onClick={() => deleteAllTasks(board.id)}
            >
              Yes
            </button>
            <button
              className="cancelDeleteAllTasks"
              onClick={() => setShowDeleteAllTasksModal(false)}
            >
              No
            </button>
          </ModalOverlay>
        )}
      </ModalOverlay>
    </>
  );
}
