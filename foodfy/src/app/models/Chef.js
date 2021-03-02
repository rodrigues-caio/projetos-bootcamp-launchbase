const db = require('../../config/database');
const { date } = require('../../utils/date');

module.exports = {
  all: (callback) => {
    db.query('SELECT * FROM chefs', (err, results) => {
      if (err) throw new Error(`Database Error: ${err}`);

      callback(results.rows);
    });
  },

  create: (data, callback) => {
    const { name, avatar_url } = data;

    const query = `INSERT INTO 
      chefs (name, avatar_url, created_at) VALUES 
      ($1, $2, $3)
      RETURNING id
      `;

    const values = [name, avatar_url, date(Date.now()).iso];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback(results);
    });
  },

  find: (id, callback) => {
    const query = `SELECT * FROM chefs WHERE id = $1`;

    db.query(query, [id], (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback(results.rows[0]);
    });
  },

  update: (data, callback) => {
    const query = `
      UPDATE chefs SET 
      name=($1),
      avatar_url=($2)
      WHERE id = $3
    `;

    const values = [data.name, data.avatar_url, data.id];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback();
    });
  },

  delete: (id, callback) => {
    const query = `DELETE FROM chefs WHERE id = $1`;

    db.query(query, [id], (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback();
    });
  },
};
