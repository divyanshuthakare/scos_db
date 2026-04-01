import express from "express";
import {
  createMappingController,
  getMappingsController
} from "./uir.controller.js";

const router = express.Router();

router.post("/", createMappingController);
router.get("/", getMappingsController);

export default router;