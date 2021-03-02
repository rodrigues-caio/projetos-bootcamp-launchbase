const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');

module.exports = {
  index: (request, response) => {
    Chef.all((chefs) => {
      return response.render('admin/chefs/index', { chefs });
    });
  },

  create: (request, response) => {
    return response.render('admin/chefs/create');
  },

  post: (request, response) => {
    const keys = Object.keys(request.body);

    for (let key of keys) {
      if (request.body[key] == '') {
        return response.json({ error: 'Please, fill all the fields.' });
      }
    }

    Chef.create(request.body, (chef) => {
      return response.redirect('/admin/chefs');
    });
  },

  show: (request, response) => {
    const { id } = request.params;

    Chef.find(id, (chef) => {
      if (!chef) return response.status(400).json({ error: 'Chef not found.' });

      Recipe.findAllRecipesOfOneChef(id, (recipes) => {
        return response.render('admin/chefs/show', { chef, recipes });
      });
    });
  },

  edit: (request, response) => {
    const { id } = request.params;

    Chef.find(id, (chef) => {
      if (!chef) return response.json({ error: 'Chef not found.' });

      return response.render('admin/chefs/edit', { chef });
    });
  },

  put: (request, response) => {
    const keys = Object.keys(request.body);

    for (let key of keys) {
      if (request.body[key] == '') {
        return response
          .status(422)
          .json({ error: 'Please, fill all the fields.' });
      }
    }

    Chef.update(request.body, () => {
      return response.redirect(`/admin/chefs/${request.body.id}`);
    });
  },

  delete: (request, response) => {
    const { id } = request.body;

    Chef.delete(id, () => {
      return response.redirect('/admin/chefs');
    });
  },
};
