import React from "react";
import useBoards from "../features/board/useBoards";

export default function Notifications() {
  const { notification, setNotification } = useBoards();
  if (!notification) return null;
  return (
    <div className="notification-banner flex items-center gap-4 fixed top-0 right-0 z-50 bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <p className="text-gray-500">{notification}</p>
      <button
        className="bg-black text-white px-2 py-1 rounded-md hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
        onClick={() => setNotification(null)}
      >
        Dismiss
      </button>
    </div>
  );
}
