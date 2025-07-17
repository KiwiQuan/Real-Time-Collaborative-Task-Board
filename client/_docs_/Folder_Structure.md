# Client (Frontend) Folder Structure

This document explains the purpose of each folder in the React frontend project.

- **public/**: Static files served as-is (e.g., `index.html`, favicon, images).
- **src/**: Source code for the React app.
  - **assets/**: Images, SVGs, and other static resources used in the app.
  - **components/**: Reusable UI components (e.g., Button, Modal).
  - **features/**: Feature-specific folders (e.g., board, task) containing related components, logic, and API calls.
  - **hooks/**: Custom React hooks for reusable logic.
  - **services/**: API and SSE logic (e.g., `api.js`, `sse.js`).
  - **utils/**: Helper functions used across the app.
  - **styles/**: Global and component-specific CSS files.
  - **App.jsx**: Root React component.
  - **main.jsx**: Entry point that renders the app.
- **.gitignore**: Specifies files and folders to be ignored by Git.
- **package.json**: Project metadata and dependencies.
- **vite.config.js**: Vite configuration file.
- **README.md**: Project overview and instructions.

> As the project grows, new folders may be added to `src/` for better organization.
