import {
  createInstitute,
  getInstitutes
} from "./institute.model.js";

// CREATE INSTITUTE
export const createInstituteController = async (req, res, next) => {
  try {
    const data = await createInstitute(req.body);

    return res.status(201).json({
      success: true,
      message: "Institute created",
      data
    });
  } catch (err) {
    next(err);
  }
};

// 🔥 CREATE WITH IMAGE (ADD THIS)
export const createInstituteWithImage = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      image_url: req.file?.path || null
    };

    const result = await createInstitute(data);

    return res.status(201).json({
      success: true,
      message: "Institute created with image",
      data: result
    });
  } catch (err) {
    next(err);
  }
};

// GET INSTITUTES
export const getInstitutesController = async (req, res, next) => {
  try {
    const data = await getInstitutes();

    return res.status(200).json({
      success: true,
      message: "Institutes fetched",
      data
    });
  } catch (err) {
    next(err);
  }
};