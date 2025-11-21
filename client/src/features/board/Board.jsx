import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Board({ board }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(board.tasks || []);
  }, [board]);

  return (
    <li className="boardItem min-w-[300px] max-w-[300px]">
      <Link
        className="boardLink font-medium px-5 py-5 gap-10 border border-gray-300 shadow-sm basis-full bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out mb-5 hover:scale-101 flex flex-col"
        to={`/board/${board.id}`}
      >
        <p className="text-2xl font-medium">{board.name}</p>
        <p className="text-gray-500 text-sm truncate w-full">
          {board.description}
        </p>
        <div className="flex flex-col gap-3">
          <div className="text-gray-500 text-sm flex justify-between">
            <p>Total Tasks</p>
            <p className="text-black font-medium">{tasks.length}</p>
          </div>
          <div className="taskStatus flex items-center gap-5">
            <span className="bg-green-500 w-4 h-4 rounded-full"></span>
            <p className="text-gray-500">
              {tasks.filter((task) => task.completed).length}
            </p>
            <span className="bg-red-500 w-4 h-4 rounded-full"></span>
            <p className="text-gray-500">
              {tasks.filter((task) => !task.completed).length}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
