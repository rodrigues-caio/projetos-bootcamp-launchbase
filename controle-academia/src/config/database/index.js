const { Pool } = require('pg');

module.exports = new Pool({
  port: 5432,
  host: 'localhost',
  database: 'gymmanager',
  user: 'postgres',
  password: 'docker',
});
