const Bookshelf = require('../db/bookshelf');
const User = require('./user');

const Local = Bookshelf.Model.extend({
  tableName: 'local_logins',
  users: () => this.belongsTo(User),
});

module.exports = Bookshelf.model('Local', Local);
