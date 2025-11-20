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
        {error && (
          <p className="error text-red-500 text-lg font-medium text-center">
            {error}
          </p>
        )}
        <div className="boardUpdateContainer flex gap-9">
          <div className="boardUpdateFormContent flex flex-col">
            <h2 className="boardUpdateTitle text-2xl font-bold mb-8 self-center">
              Update Board
            </h2>
            <form
              className="boardUpdateForm flex flex-col gap-4"
              onSubmit={handleUpdateBoard}
            >
              <label>
                <p className="boardNameText text-lg">Board Name:</p>
                <input
                  className="boardName text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  type="text"
                  placeholder={board.name}
                  name="name"
                />
              </label>
              <label>
                <p className="boardDescriptionText text-lg">
                  Board Description:
                </p>
                <textarea
                  className="boardDescription text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 resize-none h-24 w-full"
                  placeholder={board.description}
                  name="description"
                ></textarea>
              </label>
              <button
                className="updateBoard text-lg font-medium p-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                type="submit"
              >
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
                className="showCreateTaskModal text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                onClick={() => setShowCreateTaskModal(true)}
              >
                Create Task
              </button>

              <button
                className="deleteBoard text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                onClick={() => deleteBoard(board.id)}
              >
                Delete Board
              </button>
              <button
                className="showDeleteAllTasksModal text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
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
                className="deleteAllTasks cursor-pointer text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 w-1/4"
                onClick={() => deleteAllTasks(board.id)}
              >
                Yes
              </button>
              <button
                className="cancelDeleteAllTasks cursor-pointer text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 w-1/4"
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
