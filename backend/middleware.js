import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(403).json({ message: "token not found" });
  }

  const token = authToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: "invalid token" });
  }
};

module.exports = { authMiddleware };
