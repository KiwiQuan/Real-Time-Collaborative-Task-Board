# Project Build Plan

## 1. Backend (Express + SSE)

- [x] Set up Express server structure (`server/`)
- [x] Implement in-memory data storage for boards and tasks
- [x] Create REST API endpoints:
  - [x] GET /boards
  - [x] POST /boards
  - [x] GET /boards/:boardId
  - [x] PATCH /boards/:boardId
  - [x] DELETE /boards/:boardId
  - [x] GET /boards/:boardId/tasks
  - [x] POST /boards/:boardId/tasks
  - [x] DELETE /boards/:boardId/tasks
  - [x] GET /boards/:boardId/tasks/:taskId
  - [x] PATCH /boards/:boardId/tasks/:taskId
  - [x] DELETE /boards/:boardId/tasks/:taskId
- [x] Implement SSE endpoint for real-time updates:
  - [x] GET /boards/:boardId/stream
- [x] Broadcast task changes to all connected clients via SSE

## 2. Frontend (React + Vite)

- [x] Set up React app structure (`client/`)
- [x] Build UI for:
  - [x] Viewing boards and tasks
  - [x] Creating boards and tasks
  - [x] Editing and deleting tasks
  - [ ] Entering a username (optional for MVP)
- [x] Connect to backend REST API for CRUD operations
- [x] Connect to SSE endpoint for real-time updates
- [x] Update UI in real time when SSE events are received

## 3. Testing & Polish

- [x] Test with multiple tabs to simulate multiple users
- [x] Add visual cues for real-time updates
- [ ] Refactor and document code

## 4. Future Enhancements (After MVP)

- [ ] Show which user performed each action
- [ ] Add authentication
- [ ] Persist data with a database
- [ ] Support private/shared boards
- [ ] Add comments, activity logs, notifications
