import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

export const createUser = asyncHandler(
  async ({ userName, fullName, email, password, avatar }) => {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ userName }, { email }],
        },
      });
      if (existingUser) {
        throw new ApiError(401, "Username or email already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdUser = await prisma.user.create({
        data: {
          userName,
          fullName,
          email,
          password: hashedPassword,
          avatar,
        },
      });

      if (!createdUser) {
        throw new ApiError(
          401,
          "Something went wrong while registering the user."
        );
      }

      return createdUser;
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user."
      );
    }
  }
);

export const findUserByEmail = asyncHandler(async (email) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    throw new ApiError(500, "Something went wrong while finding the user.");
  }
});

export const validatePassword = async (inputPassword, storedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, storedPassword);
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while validating the password."
    );
  }
};
