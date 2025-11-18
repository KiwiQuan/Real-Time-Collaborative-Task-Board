import React from "react";
import ModalOverlay from "../../../components/ModalOverlay";

export default function TaskUpdateForm({
  task,
  updateTask,
  deleteTask,
  boardId,
  setShowEditTaskModal,
}) {
  async function handleUpdateTask(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const completed = e.target.elements.completed.checked;
    const updates = {
      ...(title && { title }),
      ...(description && { description }),
      ...(completed !== undefined && { completed }),
    };

    setShowEditTaskModal(false);
    try {
      await updateTask(boardId, task.id, updates);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ModalOverlay onClose={() => setShowEditTaskModal(false)}>
      <form
        className="taskUpdateForm flex flex-col gap-4"
        onSubmit={handleUpdateTask}
      >
        <label className="taskTitleLabel flex flex-col gap-2">
          <p className="taskTitleText text-lg">Update Name:</p>
          <input
            className="taskTitle text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            type="text"
            placeholder={task.title}
            name="title"
          />
        </label>
        <label className="taskDescriptionLabel flex flex-col gap-2">
          <p className="taskDescriptionText text-lg">Update Description:</p>
          <textarea
            className="taskDescription text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 resize-none h-24"
            placeholder={task.description}
            name="description"
          ></textarea>
        </label>
        <label className="completedLabel flex items-center gap-2 self-start cursor-pointer">
          <input
            className="completed cursor-pointer w-5 h-5 p-2 rounded-md border border-gray-300 focus:outline-none bg-gray-100"
            type="checkbox"
            name="completed"
            defaultChecked={task.completed}
          />
          <p className="completedText text-lg">Completed</p>
        </label>
        <button
          className="updateTask text-lg font-medium p-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
          type="submit"
        >
          Update Task
        </button>
        <button
          className="deleteTask text-lg font-medium p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
          onClick={() => deleteTask(boardId, task.id)}
        >
          Delete Task
        </button>
      </form>
    </ModalOverlay>
  );
}
