const { Router } = require('express');
const data = require('./data');

const recipes = require('./src/app/controllers/recipes');
const chefs = require('./src/app/controllers/chefs');

const Chef = require('./src/app/models/Chef');
const Recipe = require('./src/app/models/Recipe');

const routes = Router();

routes.get('/', (request, response) => {
  return response.render('home', { recipes: data });
});

routes.get('/about', (request, response) => {
  return response.render('about');
});

routes.get('/recipes/:index', (request, response) => {
  const { index } = request.params;

  const recipe = data[index];

  if (!recipe) {
    return response.status(404).json({ error: 'Recipe not found.' });
  }

  return response.render('recipes', { recipe });
});

routes.get('/buscar', recipes.search);

routes.get('/recipes', (request, response) => {
  Recipe.all((recipes) => {
    if (!recipes)
      return response.status(400).json({ error: 'Recipes not founded.' });

    return response.render('recipes', { recipes });
  });
});

routes.get('/chefs', (request, response) => {
  Chef.all((chefs) => {
    return response.render('chefs', { chefs });
  });
});

/* === ADMIN RECIPES FOODFY === */
routes.get('/admin/recipes', recipes.index);
routes.get('/admin/recipes/create', recipes.create);
routes.get('/admin/recipes/:id', recipes.show);
routes.get('/admin/recipes/:id/edit', recipes.edit);

routes.post('/admin/recipes', recipes.post);
routes.put('/admin/recipes', recipes.put);
routes.delete('/admin/recipes', recipes.delete);

/* === ADMIN CHEFS FOODFY === */
routes.get('/admin/chefs', chefs.index);
routes.get('/admin/chefs/create', chefs.create);

routes.post('/admin/chefs', chefs.post);
routes.get('/admin/chefs/:id', chefs.show);

routes.get('/admin/chefs/edit/:id', chefs.edit);
routes.put('/admin/chefs', chefs.put);

routes.delete('/admin/chefs', chefs.delete);

module.exports = routes;
