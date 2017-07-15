const User = require('../models/user');
const Post = require('../models/post');
const camelCase = require('../utils/post');


module.exports = {
  createPost(req, res) {
    const { email, title, body, price, address, lat, lng } = req.body;
    User.where({ email })
    .fetch()
    .then(user => user.get('id'))
    .then(id =>
      new Post({ author_id: id, title, body, price, address, lat, lng })
        .save())
    .then(() => { res.send({ saved: true }); })
    .catch((err) => { console.error(err); });
  },

  getPosts(req, res) {
    Post.fetchAll()
    .then((results) => {
      const resultsJSON = camelCase(results.toJSON()).sort((a, b) => b.id - a.id);
      res.send({ posts: resultsJSON });
    });
  },

  viewPost(req, res) {
    let postJSON;
    new Post({ id: req.params.id })
    .fetch()
    .then((post) => {
      postJSON = camelCase([post.toJSON()])[0];
      return postJSON.authorId;
    })
    .then(id => new User({ id }).fetch())
    .then((user) => {
      const email = user.get('email');
      postJSON.email = email;
      delete (postJSON.authorId);
      res.send(postJSON);
    });
  },
};
