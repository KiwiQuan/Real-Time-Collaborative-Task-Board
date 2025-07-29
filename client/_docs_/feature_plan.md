# Feature Plan: SSE and State Syncing Refactor

## Goal

Refactor the app to use a centralized state (via React Context) for boards, and manage SSE subscriptions at the provider level for robust, scalable real-time updates.

---

## Checklist

- [ ] **Create BoardsContext**

  - [ ] Set up `BoardsContext` and `BoardsProvider` in `src/contexts/BoardsContext.jsx`.
  - [ ] Move board state (`boards`, `isLoading`, `error`) and CRUD actions into the provider.
  - [ ] Expose state and actions via context.

- [ ] **Refactor useBoards Hook**

  - [ ] Update `useBoards` to consume context instead of managing its own state.
  - [ ] Remove local state from `useBoards`.

- [ ] **Manage SSE in Provider**

  - [ ] Move SSE subscription logic (from `useBoardSSE`) into the `BoardsProvider`.
  - [ ] Subscribe to relevant SSE streams when boards are loaded or selected.
  - [ ] Update context state directly in SSE event handlers.

- [ ] **Update Components**

  - [ ] Refactor components (e.g., `BoardList`, `BoardDetails`) to use context state/actions.
  - [ ] Remove redundant state or hooks from components.

- [ ] **Handle SSE Errors & Reconnection**

  - [ ] Add error and close event listeners to SSE connections.
  - [ ] Implement reconnection logic with exponential backoff.
  - [ ] Show a UI indicator if the SSE connection drops.

- [ ] **UI/UX Improvements**

  - [ ] Add a global notification/toast system for real-time events.
  - [ ] Optionally, highlight updated items in the UI for a few seconds.

- [ ] **Testing**

  - [ ] Test with multiple tabs to ensure state stays in sync.
  - [ ] Test error and reconnection handling.

- [ ] **Documentation**
  - [ ] Document the context API and SSE logic for future maintainers.
  - [ ] Add comments to complex logic in provider and hooks.

---

> Update this checklist as you progress or as requirements change!
