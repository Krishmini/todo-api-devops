const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "todo-db",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "todo_user",
  password: process.env.DB_PASSWORD || "todo_password",
  database: process.env.DB_NAME || "todo_db",
});

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      description VARCHAR(255) NOT NULL,
      status VARCHAR(30) NOT NULL DEFAULT 'todo'
    )
  `);

  console.log("Table tasks prête");
}

module.exports = {
  pool,
  initializeDatabase,
};