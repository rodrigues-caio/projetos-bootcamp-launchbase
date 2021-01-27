const Member = require('../models/Member');

const { age, date } = require('../../lib/utils');

module.exports = {
  index(request, response) {
    let { filter, page, limit } = request.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(members) {
        const pagination = {
          page,
          total: Math.ceil(members[0].total / limit),
        };

        return response.render('members/index', {
          members,
          pagination,
          filter,
        });
      },
    };

    Member.paginate(params);
  },

  create(request, response) {
    Member.instructorsSelectOptions((options) => {
      return response.render('members/create', { instructorsOptions: options });
    });
  },

  post(request, response) {
    const keys = Object.keys(request.body);

    for (let key of keys) {
      if (request.body[key] == '') {
        return response.send('Please, fill all fields!');
      }
    }

    Member.create(request.body, (member) => {
      return response.redirect(`/members/${member.id}`);
    });
  },

  show(request, response) {
    Member.find(request.params.id, (member) => {
      if (!member) return response.json({ error: 'member not found.' });

      member.birth = date(member.birth).birthDay;

      return response.render('members/show', {
        member,
      });
    });
  },

  edit(request, response) {
    Member.find(request.params.id, (member) => {
      if (!member) return response.json({ error: 'member not found.' });

      member.birth = date(member.birth).iso;

      Member.instructorsSelectOptions((options) => {
        return response.render('members/edit', {
          member,
          instructorsOptions: options,
        });
      });
    });
  },

  put(request, response) {
    const keys = Object.keys(request.body);

    for (let key of keys) {
      if (request.body[key] == '') {
        return response.json({ error: 'Fill all the fields.' });
      }
    }

    Member.update(request.body, function () {
      return response.redirect(`/members/${request.body.id}`);
    });
  },

  delete(request, response) {
    Member.delete(request.body.id, () => {
      return response.redirect('/members');
    });
  },
};
