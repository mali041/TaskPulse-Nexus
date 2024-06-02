Sure, here is a comprehensive `README.md` file that includes information and instructions for both the frontend and backend of your TaskPulse Nexus project, along with a combined script to start both parts of the project.

---

# TaskPulse Nexus

TaskPulse Nexus is an application designed to efficiently manage and connect tasks, ensuring nothing slips through the cracks. This repository contains both the frontend and backend code for the application.

## Project Structure

The project is divided into two main parts:

1. **Backend**: Built with Node.js, Express, and Prisma.
2. **Frontend**: Built with React, Chakra UI, and Vite.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (or any other database compatible with Prisma)

## Backend

### Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the backend root directory and add the following environment variables:

   ```env
   PORT=3000
   DATABASE_URL=your_database_url
   ACCESS_TOKEN_SECRET=your_jwt_secret
   ACCESS_TOKEN_EXPIRY=1d
   COOKIE_EXPIRE=7
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CORS_ORIGIN=http://localhost:5173
   ```

### Running the Backend

To start the backend server, run:

```bash
npm run dev
```

### Backend Structure

- `index.js`: Entry point of the application.
- `app.js`: Sets up the Express application and middleware.
- `controllers`: Contains controller logic for user and task management.
- `models`: Contains user model with Prisma client setup.
- `routers`: Defines API routes for user and task endpoints.
- `middlewares`: Contains middleware for authentication and file uploads.
- `utils`: Contains utility functions such as API response handling and JWT token generation.

## Frontend

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the frontend root directory and add the following environment variables:

   ```env
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   ```

### Running the Frontend

To start the frontend development server, run:

```bash
npm run dev
```

### Frontend Structure

- `src`: Contains the source code for the frontend.
  - `_skeletons`: Contains skeleton components for loading states.
  - `components`: Contains reusable components such as `NavBar`, `PrivateRoute`, and `TaskForm`.
  - `context`: Contains context providers such as `UserContext`.
  - `pages`: Contains page components for different routes such as `Home`, `Profile`, `SignIn`, `SignUp`, `Tasks`, `CreateTask`, and `UpdateTask`.
  - `app.css`: Global CSS file.
  - `app.jsx`: Root component.
  - `index.css`: Base CSS file.
  - `util.js`: Utility functions.

## Running the Full Project

To run both the backend and frontend concurrently, you can use a tool like `concurrently`. First, install it globally:

```bash
npm install -g concurrently
```

Then, in the root of your project (where both `frontend` and `backend` folders are), create a `package.json` with the following content:

```json
{
  "name": "taskpulse-nexus",
  "version": "1.0.0",
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix server\" \"npm run dev --prefix client\""
  }
}
```

Now, you can run both the backend and frontend with a single command:

```bash
npm run dev
```
