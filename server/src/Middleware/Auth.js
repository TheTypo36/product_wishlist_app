import { verify } from "jsonwebtoken";
import { User } from "../Models/userSchema";

export const verifyJwt = async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(300).json(300, { message: "authorized user" });
  }

  const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decoded) {
    return res.status(300).json(300, { message: "authorized user" });
  }

  const user = await User.findById(decoded?._id);

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  req.userId = user._id;

  next();
};
