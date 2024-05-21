import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/createTask").post(verifyJWT, createTask);
router.route("/updateTask/:id").patch(verifyJWT, updateTask);
router.route("/deleteTask/:id").delete(verifyJWT, deleteTask);
router.route("/").get(verifyJWT, getTasks);

export default router;
