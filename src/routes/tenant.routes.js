import express from "express";
import { createTenantController } from "../controllers/tenant.controller.js";

const router = express.Router();

router.post("/", createTenantController);

export default router;