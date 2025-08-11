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
      <form className="taskUpdateForm" onSubmit={handleUpdateTask}>
        <label>
          Update Name:
          <input
            className="taskTitle"
            type="text"
            placeholder={task.title}
            name="title"
          />
        </label>
        <label>
          Update Description:
          <input
            className="taskDescription"
            type="text"
            placeholder={task.description}
            name="description"
          />
        </label>
        <label>Completed:</label>
        <input
          className="taskCompleted"
          type="checkbox"
          name="completed"
          defaultChecked={task.completed}
        />
        <button className="updateTask" type="submit">
          Update Task
        </button>
        <button
          className="deleteTask"
          onClick={() => deleteTask(boardId, task.id)}
        >
          Delete Task
        </button>
      </form>
    </ModalOverlay>
  );
}
