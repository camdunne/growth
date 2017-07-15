const Bookshelf = require('../db/bookshelf');
const LocalLogin = require('./localLogin');

const User = Bookshelf.Model.extend({
  tableName: 'users',
  localLogins: () => this.hasOne(LocalLogin),
});

module.exports = Bookshelf.model('User', User);
