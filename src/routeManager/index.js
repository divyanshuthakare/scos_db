import express from "express";
import tenantRoutes from "../routes/tenant.routes.js";
import userRoutes from "../routes/user.routes.js";
import instituteRoutes from "../routes/institute.routes.js";
import roleRoutes from "../routes/role.routes.js";
import uirRoutes from "../routes/uir.routes.js";
import authRoutes from "../routes/auth.routes.js";

const router = express.Router();

router.use("/tenants", tenantRoutes);
router.use("/users", userRoutes);
router.use("/institutes", instituteRoutes);
router.use("/roles", roleRoutes);
router.use("/user-institute-roles", uirRoutes);
router.use("/auth", authRoutes);

router.get("/", (req, res) => {
  res.send("SCOS Backend Running 🚀");
});

export default router;