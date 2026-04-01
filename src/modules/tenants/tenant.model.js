import pool from "../../db/db.js";

export const createTenant = async (data) => {
  const result = await pool.query(
    `INSERT INTO tenants (name, code)
     VALUES ($1, $2)
     RETURNING *`,
    [data.name, data.code]
  );

  return result.rows[0];
};