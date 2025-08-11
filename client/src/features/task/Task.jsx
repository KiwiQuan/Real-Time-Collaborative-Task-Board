import React from "react";
import ModalOverlay from "../../components/ModalOverlay";
import useTasks from "./useTasks";

export default function Task({ task }) {
  const { updateTask, deleteTask } = useTasks();

  return (
    <li>
      <h3>{task.title}</h3>
      <p>{task.completed ? "Completed" : "Not Completed"}</p>
      <button>Edit Task</button>
    </li>
  );
}
