const { Pool } = require('pg');

// Database configuration
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'warehouse_db',
  password: 'your_password',
  port: 5432
});

module.exports = pool;
