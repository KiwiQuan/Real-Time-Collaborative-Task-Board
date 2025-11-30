import React from "react";
import ModalOverlay from "../../../components/ModalOverlay";

function BoardOptions({
  setShowBoardOptionsModal,
  deleteBoard,
  board,
  setShowDeleteAllTasksModal,
  showDeleteAllTasksModal,
  deleteAllTasks,
}) {
  return (
    <>
      <ModalOverlay
        title="Board Options"
        onClose={() => setShowBoardOptionsModal(false)}
      >
        <div className="boardOptions">
          <div className="boardOptionsButtons flex flex-col gap-4">
            <button
              className="deleteBoard text-lg font-medium p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-red-500 text-white hover:bg-red-600/90 transition-colors duration-200 cursor-pointer"
              onClick={() => deleteBoard(board.id)}
            >
              Delete Board
            </button>
            <button
              className="showDeleteAllTasksModal text-lg font-medium p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
              onClick={() => setShowDeleteAllTasksModal(true)}
            >
              Delete All Tasks
            </button>
          </div>
        </div>
      </ModalOverlay>
      {showDeleteAllTasksModal && (
        <ModalOverlay onClose={() => setShowDeleteAllTasksModal(false)}>
          <div className="deleteAllTasksModalContent flex flex-col gap-4 justify-center items-center">
            <p className="confirmationMessage">
              Are you sure you want to delete all tasks?
            </p>
            <button
              className="deleteAllTasks cursor-pointer text-lg font-medium p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-red-500 text-white hover:bg-red-600/90 transition-colors duration-200 w-1/4"
              onClick={() => deleteAllTasks(board.id)}
            >
              Yes
            </button>
            <button
              className="cancelDeleteAllTasks cursor-pointer text-lg font-medium p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white hover:bg-gray-800 transition-colors duration-200 w-1/4"
              onClick={() => setShowDeleteAllTasksModal(false)}
            >
              No
            </button>
          </div>
        </ModalOverlay>
      )}
    </>
  );
}

export default BoardOptions;
