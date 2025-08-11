import React from "react";
import { useState } from "react";
import ModalOverlay from "../../components/ModalOverlay";
import useTasks from "./useTasks";
import TaskUpdateForm from "./form/TaskUpdateForm";

export default function Task({ task, boardId }) {
  const { updateTask, deleteTask } = useTasks();
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  return (
    <li className="taskItem">
      <h3 className="taskTitle">{task.title}</h3>
      <p className="taskDescription">
        {task.completed ? "Completed" : "Not Completed"}
      </p>
      <button
        className="showTaskEditModal"
        onClick={() => setShowEditTaskModal(true)}
      >
        Edit Task
      </button>
      {showEditTaskModal && (
        <TaskUpdateForm
          task={task}
          setShowEditTaskModal={setShowEditTaskModal}
          updateTask={updateTask}
          deleteTask={deleteTask}
          boardId={boardId}
        />
      )}
    </li>
  );
}
