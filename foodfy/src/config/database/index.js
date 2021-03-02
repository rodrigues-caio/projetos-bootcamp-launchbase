const { Pool } = require('pg');

module.exports = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'foodfy',
  user: 'postgres',
  password: 'docker',
});
