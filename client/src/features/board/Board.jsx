import React from "react";
import { Link } from "react-router";

export default function Board({ board }) {
  return (
    <li>
      <Link to={`/board/${board.id}`}>{board.name}</Link>
    </li>
  );
}
