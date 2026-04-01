import express from "express";
import tenantRoutes from "../modules/tenants/tenant.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import instituteRoutes from "../modules/institute/institute.routes.js";
import roleRoutes from "../modules/roles/role.routes.js";
import uirRoutes from "../modules/user_institute_roles/uir.routes.js";
import authRoutes from "../modules/login/auth.routes.js";

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