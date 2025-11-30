import React from "react";
import ModalOverlay from "../../../components/ModalOverlay";
import { useState } from "react";
import EditBoardModal from "../modals/EditBoardModal";
import BoardOptions from "../modals/BoardOptions";

export default function BoardUpdateForm({
  board,
  setShowEditBoardModal,
  error,
  updateBoard,
  deleteBoard,
  deleteAllTasks,
}) {
  const [showDeleteAllTasksModal, setShowDeleteAllTasksModal] = useState(false);
  const [showBoardOptionsModal, setShowBoardOptionsModal] = useState(false);
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
      <EditBoardModal
        board={board}
        setShowEditBoardModal={setShowEditBoardModal}
        error={error}
        updateBoard={handleUpdateBoard}
        setShowBoardOptionsModal={setShowBoardOptionsModal}
      />
      {showBoardOptionsModal && (
        <BoardOptions
          setShowBoardOptionsModal={setShowBoardOptionsModal}
          deleteBoard={deleteBoard}
          board={board}
          setShowDeleteAllTasksModal={setShowDeleteAllTasksModal}
          showDeleteAllTasksModal={showDeleteAllTasksModal}
          deleteAllTasks={deleteAllTasks}
        />
      )}
    </>
  );
}
