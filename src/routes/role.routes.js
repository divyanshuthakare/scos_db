import express from "express";
import {
  createRoleController,
  getRolesController
} from "../controllers/role.controller.js";

const router = express.Router();

router.post("/", createRoleController);
router.get("/", getRolesController);

export default router;