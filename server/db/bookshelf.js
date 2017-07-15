const knex = require('knex');
const Bookshelf = require('bookshelf');
const { config } = require('dotenv');
const knexfile = require('./knexfile');

config();

const bookshelf = Bookshelf((knex)(knexfile[process.env.NODE_ENV || 'development']));

bookshelf.plugin('registry');

module.exports = bookshelf;
