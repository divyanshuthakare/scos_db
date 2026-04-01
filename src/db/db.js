import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
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