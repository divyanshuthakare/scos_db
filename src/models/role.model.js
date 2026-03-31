import pool from "../config/db.js";

export const createRole = async (data) => {
  const result = await pool.query(
    `INSERT INTO roles (name, code, icon_url)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [data.name, data.code, data.icon_url]
  );

  return result.rows[0];
};

export const getRoles = async () => {
  const result = await pool.query(`SELECT * FROM roles`);
  return result.rows;
};