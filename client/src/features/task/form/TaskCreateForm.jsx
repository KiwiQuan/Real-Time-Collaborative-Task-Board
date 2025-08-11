import React from "react";
import ModalOverlay from "../../../components/ModalOverlay";

export default function TaskCreateForm({
  setShowCreateTaskModal,
  createTask,
  board,
}) {
  async function handleCreateTask(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("name");
    const description = formData.get("description");
    const completed = e.target.elements.completed.checked;
    const task = { title, description, completed };
    console.log(task);
    setShowCreateTaskModal(false);
    try {
      await createTask(board.id, task);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ModalOverlay onClose={() => setShowCreateTaskModal(false)}>
      <form onSubmit={handleCreateTask}>
        <label>
          Task Name
          <input type="text" placeholder="Task Name" name="name" required />
        </label>
        <label>
          Task Description
          <input
            type="text"
            placeholder="Task Description"
            name="description"
            required
          />
        </label>
        <label>
          Completed
          <input type="checkbox" name="completed" />
        </label>
        <button type="submit">Create Task</button>
      </form>
    </ModalOverlay>
  );
}
