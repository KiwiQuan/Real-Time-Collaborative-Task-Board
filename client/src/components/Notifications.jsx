import React from "react";
import useBoards from "../features/board/useBoards";

export default function Notifications() {
  const { notification, setNotification } = useBoards();
  if (!notification) return null;
  return (
    <div className="notification-banner fixed top-0 right-0">
      {notification}
      <button onClick={() => setNotification(null)}>Dismiss</button>
    </div>
  );
}
