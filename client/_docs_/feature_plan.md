# Feature Plan: SSE and State Syncing Refactor

## Goal

Refactor the app to use a centralized state (via React Context) for boards, and manage SSE subscriptions at the provider level for robust, scalable real-time updates.

---

## Checklist

- [x] **Create BoardsContext**

  - [x] Set up `BoardsContext` and `BoardsProvider` in `src/contexts/BoardsContext.jsx`.
  - [x] Move board state (`boards`, `isLoading`, `error`) and CRUD actions into the provider.
  - [x] Expose state and actions via context.

- [x] **Refactor useBoards Hook**

  - [x] Update `useBoards` to consume context instead of managing its own state.
  - [x] Remove local state from `useBoards`.

- [x] **Manage SSE in Provider**

  - [x] Move SSE subscription logic (from `useBoardSSE`) into the `BoardsProvider`.
  - [x] Subscribe to relevant SSE streams when boards are loaded or selected.
  - [x] Update context state directly in SSE event handlers.

- [x] **Update Components**

  - [x] Refactor components (e.g., `BoardList`, `BoardDetails`) to use context state/actions.
  - [x] Remove redundant state or hooks from components.

- [ ] **Handle SSE Errors & Reconnection**

  - [ ] Add error and close event listeners to SSE connections.
  - [ ] Implement reconnection logic with exponential backoff.
  - [ ] Show a UI indicator if the SSE connection drops.

- [ ] **UI/UX Improvements**

  - [x] Add a global notification/toast system for real-time events.
  - [ ] Optionally, highlight updated items in the UI for a few seconds.

- [ ] **Testing**

  - [ ] Test with multiple tabs to ensure state stays in sync.
  - [ ] Test error and reconnection handling.

- [ ] **Documentation**
  - [ ] Document the context API and SSE logic for future maintainers.
  - [ ] Add comments to complex logic in provider and hooks.

---

> Update this checklist as you progress or as requirements change!
