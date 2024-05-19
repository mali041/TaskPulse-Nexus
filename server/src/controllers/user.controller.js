import {
  createUser,
  findUserByEmail,
  validatePassword,
} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";
import { cookieToken } from "../utils/cookieToken.js";

export const registerUser = async (req, res) => {
  try {
    const { userName, fullName, email, password } = req.body;

    if (!userName || !fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
      return res.status(400).json({ error: "Avatar file is required" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password" });
    }

    const user = await findUserByEmail(email);

    if (!user || !(await validatePassword(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    cookieToken(user, res);
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
