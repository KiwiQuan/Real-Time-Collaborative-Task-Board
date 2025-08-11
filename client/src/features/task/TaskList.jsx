import React from "react";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";

export default function TaskList({ tasks, boardId }) {
  return (
    <ul className="taskList">
      {tasks.map((task) => (
        <Task key={uuidv4()} task={task} boardId={boardId} />
      ))}
    </ul>
  );
}
