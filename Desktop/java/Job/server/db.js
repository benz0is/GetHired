const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  password: "admin",
  database: "gethired",
  host: "localhost",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
