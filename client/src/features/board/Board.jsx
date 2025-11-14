import React from "react";
import { Link } from "react-router";

export default function Board({ board }) {
  return (
    <li className="boardItem px-5 rounded- border border-gray-300 shadow-sm flex bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out mb-5 min-h-[100px] hover:scale-101">
      <Link
        className="boardLink font-medium text-2xl size-full flex items-center"
        to={`/board/${board.id}`}
      >
        {board.name}
      </Link>
    </li>
  );
}
