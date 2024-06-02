import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  getTaskById,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/createTask").post(verifyJWT, createTask);
router.route("/:id").patch(verifyJWT, updateTask);
router.route("/:id").delete(verifyJWT, deleteTask);
router.route("/").get(verifyJWT, getTasks);
router.route("/:id").get(verifyJWT, getTaskById);

export default router;
