import bcrypt from "bcrypt";
import pool from "../../db/db.js";
import { generateToken } from "../../services/jwt.service.js";

// 🔹 LOGIN
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        error_code: "VALIDATION_ERROR"
      });
    }

    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        error_code: "INVALID_CREDENTIALS"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        error_code: "INVALID_CREDENTIALS"
      });
    }

    const token = generateToken({
      user_id: user.id,
      email: user.email,
      token_type: "pre_context"
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      pre_context_token: token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email
      }
    });

  } catch (err) {
    next(err);
  }
};

// 🔹 GET INSTITUTES + ROLES
// 🔹 GET INSTITUTES + ROLES
export const getMyInstitutesRolesController = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;

    const result = await pool.query(`
      SELECT 
        uir.tenant_id,
        i.id as institute_id,
        i.name as institute_name,
        i.type as institute_type,
        i.location as institute_location,   -- 🔥 ADD THIS
        i.image_url AS image_url,
        r.id as role_id,
        r.name as role_name
      FROM user_institute_roles uir
      JOIN institutes i ON uir.institute_id = i.id
      JOIN roles r ON uir.role_id = r.id
      WHERE uir.user_id = $1
    `, [user_id]);

    const data = {};

    result.rows.forEach(row => {

      if (!data[row.institute_id]) {
        data[row.institute_id] = {
          tenant_id: row.tenant_id,
          institute_id: row.institute_id,
          institute_name: row.institute_name,
          institute_type: row.institute_type,
          institute_location: row.institute_location,  // 🔥 ADD THIS
          image_url: row.image_url,
          roles: []
        };
      }

      data[row.institute_id].roles.push({
        role_id: row.role_id,
        role_name: row.role_name
      });

    });

    return res.status(200).json({
      success: true,
      message: "Institutes fetched successfully",
      data: Object.values(data)
    });

  } catch (err) {
    next(err);
  }
};


// 🔹 SELECT CONTEXT
export const selectContextController = async (req, res, next) => {
  try {
    const { tenant_id, institute_id, role_id } = req.body;
    const user_id = req.user.user_id;

    if (!tenant_id || !institute_id || !role_id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        error_code: "VALIDATION_ERROR"
      });
    }

    // validate mapping
    const result = await pool.query(`
      SELECT * FROM user_institute_roles
      WHERE user_id = $1
      AND tenant_id = $2
      AND institute_id = $3
      AND role_id = $4
    `, [user_id, tenant_id, institute_id, role_id]);

    if (result.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Invalid context selection",
        error_code: "INVALID_CONTEXT"
      });
    }

    const accessToken = generateToken({
      user_id,
      tenant_id,
      institute_id,
      role_id,
      token_type: "access"
    });

    return res.status(200).json({
      success: true,
      message: "Context selected successfully",
      access_token: accessToken,
      selected_context: {
        tenant_id,
        institute_id,
        role_id
      }
    });

  } catch (err) {
    next(err);
  }


};

// 🔹 GET CURRENT USER (/auth/me)
export const meController = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: req.user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error_code: "SERVER_ERROR"
    });
  }
};