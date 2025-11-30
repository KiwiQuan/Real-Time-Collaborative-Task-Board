import React from "react";
import ModalOverlay from "../../../components/ModalOverlay";

function EditBoardModal({
  board,
  setShowEditBoardModal,
  error,
  updateBoard,

  setShowBoardOptionsModal,
}) {
  return (
    <>
      <ModalOverlay
        title="Update Board"
        onClose={() => setShowEditBoardModal(false)}
      >
        {error && (
          <p className="error text-red-500 text-lg font-medium text-center">
            {error}
          </p>
        )}
        <div className="boardUpdateFormContent flex flex-col grow gap-5">
          <form
            className="boardUpdateForm flex flex-col gap-4"
            onSubmit={updateBoard}
          >
            <label>
              <p className="boardNameText text-lg">Board Name:</p>
              <input
                className="boardName w-full text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                type="text"
                placeholder={board.name}
                name="name"
              />
            </label>
            <label>
              <p className="boardDescriptionText text-lg">Board Description:</p>
              <textarea
                className="boardDescription text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 resize-none h-24 w-full"
                placeholder={board.description}
                name="description"
              ></textarea>
            </label>

            <button
              className="updateBoard text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
              type="submit"
            >
              Update Board
            </button>
          </form>
          <button
            className="showBoardOptionsModal text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
            onClick={() => {
              setShowBoardOptionsModal(true);
            }}
          >
            Board Options
          </button>
        </div>
      </ModalOverlay>
    </>
  );
}

export default EditBoardModal;
