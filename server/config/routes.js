const { isLoggedIn, loginSuccess, loginPage, signupPage, logoutRedirect, getUser } = require('../controllers/user');
const { createPost, getPosts, viewPost } = require('../controllers/post');

module.exports = (app, passport, router) => {
  router.route('/')
  .get(isLoggedIn, loginSuccess);
  router.route('/login')
  .get(loginPage)
  .post(passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }));
  router.route('/signup')
  .get(signupPage)
  .post(passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true,
  }));
  router.route('/logout')
  .get(logoutRedirect);
  router.route('/api/users/profile')
  .get(getUser);
  router.route('/api/posts/create')
  .post(createPost);
  router.route('/api/posts/getAll')
  .get(getPosts);
  router.route('/api/posts/:id')
  .get(viewPost);
};
