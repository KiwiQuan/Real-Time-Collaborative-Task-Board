import { useEffect } from "react";

export default function useBoardSSE(
  boardId,
  { onBoardDeleted, onBoardUpdated }
) {
  useEffect(() => {
    if (!boardId) return;
    const eventSource = new EventSource(
      `http://localhost:3000/boards/${boardId}/stream`
    );

    eventSource.addEventListener("boardDeleted", (event) => {
      const data = JSON.parse(event.data);
      onBoardDeleted(data);
    });

    eventSource.addEventListener("boardUpdated", (event) => {
      const data = JSON.parse(event.data);
      onBoardUpdated(data);
    });
    console.log("board details rendered");
    return () => eventSource.close();
  }, []);
}
