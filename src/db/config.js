const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'jewelrydb',
  password: 'wendellsofdev',
  port: 5432,
});

module.exports = pool;