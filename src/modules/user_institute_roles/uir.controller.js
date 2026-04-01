import { createMapping, getMappings } from "./uir.model.js";

export const createMappingController = async (req, res, next) => {
  try {
    const { tenant_id, user_id, institute_id, role_id } = req.body;

    if (!tenant_id || !user_id || !institute_id || !role_id) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
        error_code: "VALIDATION_ERROR"
      });
    }

    const mapping = await createMapping(req.body);

    return res.status(201).json({
      success: true,
      message: "Mapping created",
      data: mapping
    });

  } catch (err) {
    next(err);
  }
};

export const getMappingsController = async (req, res, next) => {
  try {
    const data = await getMappings();

    return res.status(200).json({
      success: true,
      message: "Mappings fetched",
      data
    });

  } catch (err) {
    next(err);
  }
};