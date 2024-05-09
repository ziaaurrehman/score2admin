import jwt from "jsonwebtoken";
import User from "../user/userModel.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (token) {
    console.log(token);
  } else {
    console.log("Token: ", token, " Error: Missing JWT Token");
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
