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
        <div className="boardUpdateContainer flex gap-9">
          <div className="boardUpdateFormContent">
            <h2 className="boardUpdateTitle text-2xl font-bold mb-8">
              Update Board
            </h2>
            <form
              className="boardUpdateForm flex flex-col gap-4 border-r pr-9 border-gray-300"
              onSubmit={handleUpdateBoard}
            >
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
          </div>
          <div className="boardOptions">
            <h2 className="boardOptionsTitle text-2xl font-bold mb-8">
              Board Options
            </h2>
            <div className="boardOptionsButtons flex flex-col gap-4">
              <button
                className="showCreateTaskModal"
                onClick={() => setShowCreateTaskModal(true)}
              >
                Create Task
              </button>

              <button
                className="deleteBoard"
                onClick={() => deleteBoard(board.id)}
              >
                Delete Board
              </button>
              <button
                className="showDeleteAllTasksModal"
                onClick={() => setShowDeleteAllTasksModal(true)}
              >
                Delete All Tasks
              </button>
            </div>
          </div>
        </div>
        {showDeleteAllTasksModal && (
          <ModalOverlay onClose={() => setShowDeleteAllTasksModal(false)}>
            <div className="deleteAllTasksModalContent flex flex-col gap-4 justify-center items-center">
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
            </div>
          </ModalOverlay>
        )}
      </ModalOverlay>
    </>
  );
}
