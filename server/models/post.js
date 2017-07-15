const bookshelf = require('../db/bookshelf');
const User = require('./user');

const Post = bookshelf.Model.extend({
  tableName: 'posts',
  users: () => this.belongsTo(User),
});

module.exports = bookshelf.model('Post', Post);
