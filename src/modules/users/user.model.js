import pool from "../../db/db.js";

// CREATE USER
export const createUser = async (data) => {
  const query = `
    INSERT INTO users 
    (first_name, last_name, full_name, email, password_hash)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, first_name, last_name, full_name, email;
  `;

  const values = [
    data.first_name,
    data.last_name,
    data.full_name,
    data.email,
    data.password_hash
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// GET USERS
export const getUsers = async () => {
  const result = await pool.query(`
    SELECT id, first_name, last_name, full_name, email
    FROM users
  `);
  return result.rows;
};

// GET USER BY EMAIL
export const getUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};