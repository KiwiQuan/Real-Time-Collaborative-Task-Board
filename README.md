# Real-Time Collaborative Task Board (SSE Practice)

This project is a practice application for learning and mastering Server-Sent Events (SSE) in Node.js. It is a simplified, real-time collaborative task board similar to a basic version of Trello where multiple users can create, update, and delete tasks on shared boards. All changes are instantly broadcast to every connected client using SSE, allowing users to see updates in real time without refreshing the page. The project uses in-memory data storage for simplicity and focuses on building a scalable, well-structured Node.js backend.

## More Details

This project uses **Server-Sent Events (SSE)** to deliver real-time updates to all connected clients. When any user creates, updates, or deletes a task on a board, the server instantly broadcasts the change to every client currently viewing that board. No page refresh required.

Each board has its own SSE stream endpoint. Clients subscribe to updates by connecting to
`/boards/:boardId/stream`. The backend efficiently manages all active client connections and ensures that every change is pushed live, enabling seamless, collaborative task management.

- Clients open a persistent connection to the SSE endpoint for a specific board.
- The server tracks all connected clients for each board.
- When a task is created, updated, or deleted, the server broadcasts the update to all clients connected to that board's stream.
- Clients receive updates in real time and update their UI accordingly.

This approach enables a smooth, collaborative experience for all users working on shared boards.
