import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createInstituteController,
  getInstitutesController,
  createInstituteWithImage
} from "../controllers/institute.controller.js";

const router = express.Router();

router.post("/", createInstituteController);
router.get("/", getInstitutesController);

// CREATE WITH IMAGE
router.post(
  "/create-with-image",
  upload.single("image"),
  createInstituteWithImage
);

// upload only
router.post("/upload-image", upload.single("image"), (req, res) => {
  const imageUrl = `http://localhost:5001/uploads/${req.file.filename}`;

  res.json({
    success: true,
    image_url: imageUrl,
  });
});

export default router;