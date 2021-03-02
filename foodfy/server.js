const express = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');

const routes = require('./routes');

const server = express();

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.set('view engine', 'njk');
server.use(express.json());

server.use(methodOverride('_method'));

nunjucks.configure('src/app/views', {
  express: server,
  noCache: true,
  autoescape: false,
});

server.use(routes);

server.listen(5001, () => {
  console.log('Server is running to Foodfy');
});
