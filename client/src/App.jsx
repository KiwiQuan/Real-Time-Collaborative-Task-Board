import React from "react";
import { Routes, Route } from "react-router";
import BoardList from "./features/board/BoardList";
import BoardDetails from "./features/board/BoardDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardList />} />
      <Route path="/board/:id" element={<BoardDetails />} />
    </Routes>
  );
}

export default App;
