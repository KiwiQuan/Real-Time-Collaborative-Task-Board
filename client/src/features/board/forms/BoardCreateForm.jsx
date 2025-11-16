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
      <div className="boardModalContent flex gap-9">
        <div className="boardCreateDescription border-r pr-9 border-gray-300">
          <p>
            Fill in the form to create a new board! Then you can open the board
            to create tasks and organize them.
          </p>
        </div>
        <div className="boardModalForm flex flex-col gap-4">
          <h2 className="createBoardTitle text-2xl font-bold self-center">
            Create Board
          </h2>
          <form
            className="boardCreateForm flex flex-col gap-6"
            onSubmit={handleCreateBoard}
          >
            <input
              className="boardName text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              type="text"
              placeholder="Board Name"
              name="name"
              required
            />
            <input
              className="boardDescription text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              type="text"
              placeholder="Board Description"
              name="description"
              required
            />
            <button
              className="createBoard text-lg font-medium p-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
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
