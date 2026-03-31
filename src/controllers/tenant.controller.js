import { createTenant } from "../models/tenant.model.js";

export const createTenantController = async (req, res, next) => {
  try {
    const { name, code } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Tenant name is required",
        error_code: "VALIDATION_ERROR"
      });
    }

    const tenant = await createTenant({ name, code });

    return res.status(201).json({
      success: true,
      message: "Tenant created successfully",
      data: tenant
    });

  } catch (err) {
    next(err);
  }
};