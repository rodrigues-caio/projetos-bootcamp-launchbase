const fs = require('fs');
const data = require('../../../data.json');
const { off } = require('../../config/database');

const { replaceData } = require('../../utils/replaceData');

const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');

module.exports = {
  index: (request, response) => {
    let { page, limit } = request.query;

    page = page || 1;
    limit = limit || 4;
    let offset = limit * (page - 1);

    Recipe.paginate(Number(limit), Number(offset), (recipes) => {
      if (!recipes) {
        return response.status(400).json({ error: 'Recipes not found.' });
      }

      let total = Number(recipes[0].total);

      const pagination = {
        total: Math.ceil(total / limit) || 0,
        page,
      };

      return response.render('admin/recipes/index', { recipes, pagination });
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
    const { filter } = request.query;

    if (!filter) {
      return response.redirect('/');
    }

    Recipe.filterRecipes(filter, (recipes) => {
      if (!recipes)
        return response.status(400).json({ error: 'Recipes not founded.' });

      return response.render('search', { recipes, filter });
    });
  },
};
