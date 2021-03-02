const db = require('../../config/database');
const { date } = require('../../utils/date');

module.exports = {
  all: (callback) => {
    const query = `
    SELECT recipes.*, chefs.name AS chef 
    FROM recipes JOIN chefs ON recipes.chef_id = chefs.id 
    `;

    db.query(query, (err, results) => {
      if (err) throw `Database error: ${err}`;

      callback(results.rows);
    });
  },

  find: (id, callback) => {
    const query = `
      SELECT recipes.*, chefs.name AS chef
      FROM recipes JOIN chefs ON recipes.chef_id = chefs.id 
      WHERE recipes.id = $1;
    `;

    db.query(query, [id], (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback(results.rows[0]);
    });
  },

  findAllRecipesOfOneChef: (id, callback) => {
    const query = `
      SELECT recipes.id AS recipe_id, recipes.title, recipes.image, recipes.chef_id 
      FROM recipes 
      WHERE recipes.chef_id = $1;
    `;

    db.query(query, [id], (err, results) => {
      if (err) throw new Error(`Error in database: ${err}`);

      callback(results.rows);
    });
  },

  create: (data, callback) => {
    const query = `
      INSERT INTO recipes
      (chef_id, image, title, ingredients, preparation, information, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
      `;

    const values = [
      data.chef_id,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error: ${err}`;

      callback(results.rows[0]);
    });
  },

  update: (data, callback) => {
    const query = `
      UPDATE recipes SET 
      chef_id=($1),
      image=($2),
      title=($3),
      ingredients=($4),
      preparation=($5),
      information=($6)
      WHERE id = $7
    `;

    const values = [
      data.chef_id,
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id,
    ];

    db.query(query, values, (err, results) => {
      if (err) throw new Error(`Error in database to update recipe: ${err}`);

      callback();
    });
  },

  delete: (id, callback) => {
    const query = `DELETE FROM recipes WHERE id = $1`;

    db.query(query, [id], (err, results) => {
      if (err) throw new Error(`Error in database to delete recipe: ${err}`);

      callback();
    });
  },
};
