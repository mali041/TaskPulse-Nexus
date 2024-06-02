Here's the `README.md` file specifically for the frontend part of your TaskPulse Nexus project:

---

# TaskPulse Nexus - Frontend

TaskPulse Nexus is an application designed to efficiently manage and connect tasks, ensuring nothing slips through the cracks. This part of the project focuses on the frontend, built with React and Chakra UI.

## Table of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)

## Description

The frontend of TaskPulse Nexus provides a user-friendly interface for creating, updating, deleting, and managing tasks. It leverages modern React features and integrates with a backend API to provide seamless task management functionality.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mali041/TaskPulse-Nexus
   cd taskpulse-nexus/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Setup environment variables:**
   Create a `.env` file in the `frontend` directory and add the following variable:

   ```env
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

## Folder Structure

```
frontend/
├── src/
│   ├── _skeletons/
│   │   ├── SingleTaskSkeleton.jsx
│   │   ├── TasksSkeleton.jsx
│   │   └── UpdateTaskSkeleton.jsx
│   ├── components/
│   │   ├── DeleteConfirmation.jsx
│   │   ├── NavBar.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── TaskForm.jsx
│   ├── context/
│   │   └── UserContext.jsx
│   ├── pages/
│   │   ├── CreateTask.jsx
│   │   ├── Home.jsx
│   │   ├── index.jsx
│   │   ├── NotFound.jsx
│   │   ├── Profile.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── Tasks.jsx
│   │   └── UpdateTask.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── util.js
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Available Scripts

In the project directory, you can run:

- **Development Server:**

  ```bash
  npm run dev
  ```

  Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

- **Build:**

  ```bash
  npm run build
  ```

  Builds the app for production to the `dist` folder.

- **Lint:**

  ```bash
  npm run lint
  ```

  Lints the project for potential errors and code quality issues.

- **Preview:**
  ```bash
  npm run preview
  ```
  Serves the production build locally for previewing.

## Dependencies

- **@chakra-ui/react**: "^2.8.2"
- **@emotion/react**: "^11.11.4"
- **@emotion/styled**: "^11.11.5"
- **framer-motion**: "^11.2.6"
- **react**: "^18.2.0"
- **react-datepicker**: "^6.9.0"
- **react-dom**: "^18.2.0"
- **react-hook-form**: "^7.51.5"
- **react-hot-toast**: "^2.4.1"
- **react-icons**: "^5.2.1"
- **react-router-dom**: "^6.23.1"
