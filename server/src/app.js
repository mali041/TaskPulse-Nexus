import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// Middlewares & Configrations.
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routers/user.route.js";

// routes declaration
app.use("/api/v1/users", userRouter);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    message: err.message,
  });
});

export { app };
