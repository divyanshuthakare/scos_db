import pool from "../config/db.js";

export const createMapping = async (data) => {
  const result = await pool.query(`
    INSERT INTO user_institute_roles 
    (tenant_id, user_id, institute_id, role_id, is_primary)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
  `, [
    data.tenant_id,
    data.user_id,
    data.institute_id,
    data.role_id,
    data.is_primary
  ]);

  return result.rows[0];
};

export const getMappings = async () => {
  const result = await pool.query(`
    SELECT 
      uir.id,
      uir.user_id,
      uir.institute_id,
      uir.role_id,

      i.name AS institute_name,
      i.type AS institute_type,   -- 🔥 MUST
      i.image_url,

      r.name AS role_name

    FROM user_institute_roles uir
    JOIN institutes i ON uir.institute_id = i.id
    JOIN roles r ON uir.role_id = r.id
  `);

  return result.rows;
};