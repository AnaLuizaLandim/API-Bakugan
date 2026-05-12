import { Pool } from "pg";
const isProduction = process.env.NODE_ENV === "production";

let pool: Pool;
if (isProduction) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "bakugandatabase",
    password: "secret",
    port: 5433,
  });
}

export default pool;
