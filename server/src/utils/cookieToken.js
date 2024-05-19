import jwt from "jsonwebtoken";

export const cookieToken = (user, res) => {
  // Generate a JWT token
  const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });

  // Set options for the cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  user.password = undefined;

  // Send the token in a cookie
  res.cookie("token", token, options);

  // Send response
  res.status(200).json({
    success: true,
    token,
    user,
  });
};
