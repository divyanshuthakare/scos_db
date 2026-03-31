import express from "express";
import {
  loginController,
  getMyInstitutesRolesController,
  selectContextController
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { meController } from "../controllers/auth.controller.js";

const router = express.Router();

// 🔸 login
router.post("/login", loginController);

// 🔸 get institutes & roles (pre_context token)
router.get("/my-institutes-roles", authMiddleware, getMyInstitutesRolesController);

// 🔸 select context
router.post("/select-context", authMiddleware, selectContextController);

router.get("/me", authMiddleware, meController);

export default router;