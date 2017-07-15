const { resolve } = require('path');
const User = require('../models/user');

module.exports = {
  isLoggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/login');
    }
  },
  loginSuccess(req, res) {
    res.sendFile(resolve(`${__dirname}/../../public/index.html`));
  },
  loginPage(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  },
  signupPage(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  },
  logoutRedirect(req, res) {
    req.logout();
    res.redirect('/login');
  },
  getUser(req, res) {
    new User({ id: req.user.attributes.user_id })
    .fetch()
    .then((user) => {
      const userJSON = user.toJSON();
      res.send(userJSON);
    });
  },
};
