import pool from "../config/db.js";

// CREATE INSTITUTE
export const createInstitute = async (data) => {
  const query = `
    INSERT INTO institutes (tenant_id, name, code, type, image_url, location)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING 
      id,
      name AS institute_name,
      code,
      type AS institute_type,
      image_url,
      location;
  `;

  const values = [
    data.tenant_id,
    data.name,
    data.code,
    data.type,
    data.image_url,
    data.location
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// GET INSTITUTES
export const getInstitutes = async () => {
  const result = await pool.query(`
    SELECT 
      id,
      name AS institute_name,
      code,
      type AS institute_type,
      image_url,
      location
    FROM institutes
    WHERE status = 'active'
    ORDER BY created_at DESC;
  `);

  return result.rows;
};