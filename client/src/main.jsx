import React from "react";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { BoardsProvider } from "./contexts/BoardsContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BoardsProvider>
      <App />
    </BoardsProvider>
  </BrowserRouter>
);
