import { verifyToken } from "../services/jwt.service.js";

export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
        error_code: "UNAUTHORIZED"
      });
    }

    const token = header.split(" ")[1];

    const decoded = verifyToken(token);

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error_code: "INVALID_TOKEN"
    });
  }
};