const { Pool } = require("pg");

const pool = new Pool({
  host: "db",
  port: 5432,
  user: "admin",
  password: "admin",
  database: "app-codename-faerun",
});

module.exports = pool;
