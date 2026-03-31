import jwt from "jsonwebtoken";

// generate token
export const generateToken = (payload, expiresIn = "10m") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// verify token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};