import { createRole, getRoles } from "./role.model.js";

export const createRoleController = async (req, res, next) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        success: false,
        message: "name and code required",
        error_code: "VALIDATION_ERROR"
      });
    }

    const role = await createRole(req.body);

    return res.status(201).json({
      success: true,
      message: "Role created",
      data: role
    });

  } catch (err) {
    next(err);
  }
};

export const getRolesController = async (req, res, next) => {
  try {
    const roles = await getRoles();

    return res.status(200).json({
      success: true,
      message: "Roles fetched",
      data: roles
    });

  } catch (err) {
    next(err);
  }
};