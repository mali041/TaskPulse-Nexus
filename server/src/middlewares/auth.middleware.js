import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
      select: { password: false }, // Exclude password
    });

    if (!user) {
      throw new Error("Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error?.message || "Invalid access token" });
  }
});
