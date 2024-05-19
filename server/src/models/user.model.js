import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async ({
  userName,
  fullName,
  email,
  password,
  avatar,
}) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ userName }, { email }],
      },
    });
    if (existingUser) {
      throw new Error("Username or email already exists");
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
      throw new Error("Something went wrong while registering the user.");
    }

    return createdUser;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

export const findUserByEmail = async (email) => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    throw error;
  }
};

export const validatePassword = async (inputPassword, storedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, storedPassword);
  } catch (error) {
    console.error("Error in validatePassword:", error);
    throw error;
  }
};
