import bcrypt from "bcrypt";
import {
  createUser,
  getUsers,
  getUserByEmail
} from "../models/user.model.js";

export const createUserController = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        error_code: "VALIDATION_ERROR"
      });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
        error_code: "USER_EXISTS"
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const full_name = `${first_name || ""} ${last_name || ""}`.trim();

    const user = await createUser({
      first_name,
      last_name,
      full_name,
      email,
      password_hash: hash
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user
    });

  } catch (err) {
    next(err);
  }
};

export const getUsersController = async (req, res, next) => {
  try {
    const users = await getUsers();

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users
    });

  } catch (err) {
    next(err);
  }
};