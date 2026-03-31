import express from "express";
import {
    createUserController,
    getUsersController
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// 🔓 Public (user create)
router.post("/", createUserController);

// 🔐 Protected (token )
router.get("/", authMiddleware, getUsersController);


router.get(
    "/",
    authMiddleware,
    allowRoles("PASTE_SUPER_ADMIN_ID", "PASTE_INSTITUTE_ADMIN_ID"),
    getUsersController
);

export default router;