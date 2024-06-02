# TaskPulse Nexus

TaskPulse Nexus signifies an application that efficiently connects and manages tasks, ensuring nothing slips through the cracks. It’s a powerful tool for productivity and staying on top of your responsibilities!

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Prisma Configuration](#prisma-configuration)

## Features

- User authentication (register, login, logout)
- Task management (create, update, delete, get tasks)
- Secure API endpoints with JWT authentication
- Cloudinary integration for image uploads
- Error handling and validation

## Technologies Used

- Node.js
- Express.js
- Prisma (ORM)
- MongoDB
- JWT (JSON Web Tokens)
- Bcrypt
- Multer
- Cloudinary
- Dotenv

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/mali041/TaskPulse-Nexus
   cd taskpulse-nexus
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Setup Prisma:

   ```sh
   npx prisma generate
   ```

4. Ensure you have MongoDB and Cloudinary set up.

## Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
PORT=3000
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
COOKIE_EXPIRE=1
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=your_database_url
```

## Running the Application

Start the server in development mode:

```sh
npm run dev
```

Or start the server in production mode:

```sh
npm start
```

The server will run on the port specified in the `.env` file, defaulting to `3000` if not specified.

## API Endpoints

### User Routes

- **POST /api/v1/users/register**
  - Register a new user
  - Required fields: `userName`, `fullName`, `email`, `password`, `avatar`
- **POST /api/v1/users/login**

  - Login a user
  - Required fields: `email`, `password`

- **GET /api/v1/users/logout**
  - Logout a user

### Task Routes

- **POST /api/v1/tasks/createTask**
  - Create a new task
  - Required fields: `title`, `description`, `priority`, `status`, `authorId`
- **PATCH /api/v1/tasks/:id**

  - Update an existing task
  - Required fields: `title`, `description`, `priority`, `status`

- **DELETE /api/v1/tasks/:id**

  - Delete a task

- **GET /api/v1/tasks/**

  - Get all tasks

- **GET /api/v1/tasks/:id**
  - Get a task by ID

## Project Structure

```
prisma/
├── index.js
├── schema.prisma
│
src/
│
├── controllers/
│   ├── task.controller.js
│   └── user.controller.js
│
├── helper/
│   └── getJwtToken.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── multer.middleware.js
│
├── models/
│   ├── task.model.js
│   └── user.model.js
│
│
├── routers/
│   ├── task.route.js
│   └── user.route.js
│
├── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   ├── cloudinary.util.js
│   └── cookieToken.js
│
├── app.js
├── index.js
└── config.env
```

### Initializing Prisma Client

The `index.js` file in the `prisma` folder initializes the Prisma Client.

```js
// prisma/index.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```
