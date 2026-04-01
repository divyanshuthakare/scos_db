import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 🔥 test connection
pool.connect()
  .then(() => {
    console.log("PostgreSQL connected ✅");
  })
  .catch((err) => {
    console.error("DB connection failed ❌", err.message);
  });

export default pool;