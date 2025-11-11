import React from "react";
import { Link } from "react-router";

export default function Board({ board }) {
  return (
    <li className="boardItem bg-yellow-500">
      <Link className="boardLink bg-red-500" to={`/board/${board.id}`}>
        {board.name}
      </Link>
    </li>
  );
}
