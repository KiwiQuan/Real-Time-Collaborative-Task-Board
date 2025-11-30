import React, { useEffect } from "react";
import ModalOverlay from "../../../components/ModalOverlay";

export default function TaskCreateForm({
  setShowCreateTaskModal,
  setShowEditBoardModal,
  createTask,
  board,
}) {
  useEffect(() => {
    setShowEditBoardModal(false);
  }, []);
  async function handleCreateTask(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("name");
    const description = formData.get("description");
    const completed = e.target.elements.completed.checked;
    const task = { title, description, completed };
    console.log(task);
    setShowCreateTaskModal(false);
    setShowEditBoardModal(false);
    try {
      await createTask(board.id, task);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ModalOverlay
      title="Create Task"
      onClose={() => setShowCreateTaskModal(false)}
    >
      <form
        className="taskCreateForm flex flex-col gap-4"
        onSubmit={handleCreateTask}
      >
        <label className="taskNameLabel flex flex-col gap-2">
          <p className="taskNameText text-lg">Task Name:</p>
          <input
            className="taskName text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            type="text"
            placeholder="Task Name"
            name="name"
            required
          />
        </label>
        <label className="taskDescriptionLabel flex flex-col gap-2">
          <p className="taskDescriptionText text-lg">Task Description:</p>
          <textarea
            className="taskDescription text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 resize-none h-24"
            placeholder="Task Description"
            name="description"
            required
          ></textarea>
        </label>
        <label className="completedLabel flex items-center gap-2 self-start cursor-pointer">
          <input
            className="completed cursor-pointer w-5 h-5 p-2 rounded-md border border-gray-300 focus:outline-none bg-gray-100"
            type="checkbox"
            name="completed"
          />
          <p className="completedText text-lg">Completed</p>
        </label>
        <button
          className="createTask text-lg font-medium p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-white hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
          type="submit"
        >
          Create Task
        </button>
      </form>
    </ModalOverlay>
  );
}
