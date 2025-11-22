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
    <ModalOverlay
      title="Create New Board"
      onClose={() => setShowCreateBoardModal(false)}
    >
      <div className="boardModalContent">
        <div className="boardModalForm flex flex-col gap-4">
          <form
            className="boardCreateForm flex flex-col gap-6"
            onSubmit={handleCreateBoard}
          >
            <label className="boardNameLabel flex flex-col gap-2">
              <p className="boardNameText text-lg">Board Name:</p>
              <input
                className="boardName text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-100"
                type="text"
                placeholder="Enter Board Name"
                name="name"
                required
              />
            </label>
            <label className="boardDescriptionLabel flex flex-col gap-2">
              <p className="boardDescriptionText text-lg">Board Description:</p>
              <textarea
                className="boardDescription text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-gray-100 resize-none h-24 w-full"
                placeholder="Enter Board Description"
                name="description"
                required
              ></textarea>
            </label>
            <button
              className="createBoard text-lg font-medium p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 bg-black text-white hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
              type="submit"
            >
              Create Board
            </button>
          </form>
        </div>
      </div>
    </ModalOverlay>
  );
}
