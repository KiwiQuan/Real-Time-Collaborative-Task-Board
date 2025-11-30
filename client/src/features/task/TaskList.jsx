import React from "react";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";

export default function TaskList({ tasks, boardId }) {
  return (
    <ul className="taskList flex gap-4 lg:justify-center grow">
      <div className="taskListStatusGrid md:bg-gray-100 gap-2 grid grid-cols-1 md:grid-cols-2 lg:flex gap-10 grow">
        <div className="taskListCompletedList flex flex-col gap-4 grow basis-full p-4 rounded-md bg-green-100/50 border border-green-200 lg:justify-center lg:items-center">
          <div className="taskListCompletedIcon flex items-center gap-2">
            <span className="bg-green-500 w-4 h-4 rounded-full"></span>
            <p className="text-gray-500">Completed</p>
            <p className="text-gray-500 text-sm">
              {`(${tasks.filter((task) => task.completed).length})`}
            </p>
          </div>
          <div className="taskListItems flex flex-col gap-4">
            {tasks
              .filter((task) => task.completed)
              .map((task) => (
                <Task key={uuidv4()} task={task} boardId={boardId} />
              ))}
          </div>
        </div>

        <div className="taskListNotCompletedList flex flex-col gap-4 grow basis-full p-4 rounded-md bg-red-100/50 border border-red-200 lg:justify-center lg:items-center">
          <div className="taskListNotCompletedIcon flex items-center gap-2">
            <span className="bg-red-500 w-4 h-4 rounded-full"></span>
            <p className="text-gray-500">Not Completed</p>
            <p className="text-gray-500 text-sm">
              {`(${tasks.filter((task) => !task.completed).length})`}
            </p>
          </div>
          <div className="taskListItems flex flex-col gap-4">
            {tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <Task key={uuidv4()} task={task} boardId={boardId} />
              ))}
          </div>
        </div>
      </div>
    </ul>
  );
}
