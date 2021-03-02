const fs = require('fs');
const data = require('../../../data.json');

const { replaceData } = require('../../utils/replaceData');

const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');

module.exports = {
  index: (request, response) => {
    Recipe.all((recipes) => {
      if (!recipes) {
        return response.status(400).json({ error: 'Recipes not found.' });
      }

      return response.render('admin/recipes/index', { recipes });
    });
  },

  create: (request, response) => {
    Chef.all((chefs) => {
      if (!chefs) return response.json({ error: 'Not found chefs.' });

      return response.render('admin/recipes/create', { chefs });
    });
  },

  show: (request, response) => {
    const { id } = request.params;

    Recipe.find(id, (recipe) => {
      if (!recipe) return response.json({ error: 'Recipe not found' });

      recipe.ingredients = replaceData(recipe.ingredients);
      recipe.preparation = replaceData(recipe.preparation);

      return response.render('admin/recipes/show', { recipe });
    });
  },

  edit: (request, response) => {
    const { id } = request.params;

    Chef.all((chefs) => {
      if (!chefs)
        return response.status(400).json({ error: 'Chefs not found.' });

      Recipe.find(Number(id), (recipe) => {
        if (!recipe)
          return response.status(400).json({ error: 'Recipe not found.' });

        recipe.ingredients = replaceData(recipe.ingredients);

        recipe.preparation = replaceData(recipe.preparation);

        return response.render('admin/recipes/edit', {
          recipe,
          chefs,
        });
      });
    });
  },

  post: (request, response) => {
    const keys = Object.keys(request.body);

    for (let key of keys) {
      if (request.body[key] == '') {
        return response.json({ error: 'Please, fill all the fields.' });
      }
    }

    Recipe.create(request.body, (chef) => {
      return response.redirect(`/admin/recipes/${chef.id}`);
    });
  },

  put: (request, response) => {
    const keys = Object.keys(request.body);

    for (let key of keys) {
      if (request.body[key] == '') {
        return response.json({ error: 'Please, fill all the fields.' });
      }
    }

    let { id } = request.body;

    Recipe.find(Number(id), (recipe) => {
      if (!recipe)
        return response.status(400).json({ error: 'Recipe not found.' });

      const data = {
        id,
        ...recipe,
        ...request.body,
      };

      Recipe.update(data, () => {
        return response.redirect(`/admin/recipes/${id}`);
      });
    });
  },

  delete: (request, response) => {
    const { id } = request.body;

    Recipe.find(Number(id), (recipe) => {
      if (!recipe)
        return response.status(400).json({ error: 'Recipe not found.' });

      Recipe.delete(recipe.id, () => {
        return response.redirect('/admin/recipes');
      });
    });
  },

  search: (request, response) => {
    const { id } = request.body;

    if (id) {
      return response.send('ok');
    }

    return response.render('search');
  },
};
