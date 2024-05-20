import {
  createUser,
  findUserByEmail,
  validatePassword,
} from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";
import { cookieToken } from "../utils/cookieToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { userName, fullName, email, password } = req.body;

    if (!userName || !fullName || !email || !password) {
      throw new ApiError(400, "All fields is required");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    const user = await createUser({
      userName: userName.toLowerCase(),
      fullName,
      email,
      password,
      avatar: avatar.url,
    });

    cookieToken(user, res);
  } catch (error) {
    if (error.message === "Username or email already exists") {
      return res.status(400).json({ error: error.message });
    }

    console.error("Error in registerUser:", error);
    throw new ApiError(500, "Something went wrong while registring the user.");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "email & password is required");
    }

    const user = await findUserByEmail(email);

    if (!user || !(await validatePassword(password, user.password))) {
      throw new ApiError(400, "Invalid email or password");
    }

    cookieToken(user, res);
  } catch (error) {
    throw new ApiError(500, "Something went wrong while logging in the user.");
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(201).json(new ApiResponse(200, "Logged out successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while logging out the user.");
  }
});
