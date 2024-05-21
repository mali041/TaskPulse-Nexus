import { PrismaClient } from "@prisma/client";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

export const createTask = asyncHandler(async (req, res, next) => {
  const { title, description, priority, status, authorId } = req.body;
  if (!title || !description || !priority || !status || !authorId) {
    throw new ApiError(400, "All fields is required");
  }
  try {
    const result = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
        author: { connect: { id: authorId } },
      },
    });
    console.log("result", result);
    res.json(new ApiResponse(200, "Task created successfully", result));
  } catch (error) {
    throw new ApiError(404, "Something went wrong while creating the task.");
  }
});

export const updateTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Task id is required");
  }
  const { title, description, priority, status } = req.body;
  if (!title || !description || !priority || !status) {
    throw new ApiError(400, "All fields is required");
  }
  try {
    const result = await prisma.task.update({
      where: { id: id },
      data: {
        title,
        description,
        priority,
        status,
      },
    });
    res.json(new ApiResponse(200, "Task updated successfully", result));
  } catch (error) {
    throw new ApiError(404, "Something went wrong while updating the task.");
  }
});

export const deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Task id is required");
  }
  try {
    const result = await prisma.task.delete({
      where: { id: id },
    });
    res.json(new ApiResponse(200, "Task deleted successfully", result));
  } catch (error) {
    throw new ApiError(404, "Something went wrong while deleting the task.");
  }
});

export const getTasks = asyncHandler(async (req, res, next) => {
  try {
    const result = await prisma.task.findMany();
    res.json(new ApiResponse(200, "Tasks retrieved successfully", result));
  } catch (error) {
    throw new ApiError(404, "Something went wrong while retrieving the tasks.");
  }
});
