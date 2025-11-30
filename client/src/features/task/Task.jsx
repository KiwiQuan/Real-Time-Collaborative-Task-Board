import React from "react";
import { useState } from "react";
import ModalOverlay from "../../components/ModalOverlay";
import useTasks from "./useTasks";
import TaskUpdateForm from "./form/TaskUpdateForm";

export default function Task({ task, boardId }) {
  const { updateTask, deleteTask } = useTasks();
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  return (
    <li
      className={`taskItem flex flex-col grow min-h-0 hover:shadow-md transition-shadow duration-200 ease-in-out lg:max-w-[300px] lg:min-w-[300px] gap-2 bg-gray-100 p-4 rounded-md border border-gray-300 ${
        task.completed
          ? "bg-green-200/50 border-green-200"
          : "bg-red-200/50 border-red-200"
      }`}
    >
      <h3 className="taskTitle truncate">{task.title}</h3>
      <p className="taskDescription truncate text-sm text-gray-500">
        {task.description}
      </p>
      <button
        className="showTaskEditModal text-md font-medium p-2 rounded-md focus:outline-none bg-black text-white hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
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
