const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const passportLocal = require('passport-local');
const User = require('../models/user');
const Local = require('../models/localLogin');

const LocalStrategy = passportLocal.Strategy;

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    new Local({ user_id: id })
      .fetch()
      .then((user) => { done(null, user); })
      .catch((err) => { done(err); });
  });
  passport.use('local-signup', new LocalStrategy({
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    process.nextTick(() => {
      new Local({ email })
      .fetch()
      .then((user) => {
        if (user) {
          return done(null, false, req.flash('signupMessage', 'email Already Exists'));
        }
        const hashedPassword = hashSync(password, genSaltSync(8), null);
        new User({ email })
        .save()
        .then((model) => {
          const userId = model.get('id');
          new Local({ email, password: hashedPassword, user_id: userId })
          .save()
          .then(() => {
            const modelJSON = model.toJSON();
            return done(null, modelJSON);
          })
          .catch((err) => { done(err); });
        })
        .catch((err) => { done(err); });
        return undefined;
      })
      .catch((err) => { done(err); });
    });
  }));
  passport.use('local-login', new LocalStrategy({
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    new Local({ email })
      .fetch()
      .then((local) => {
        if (!local) {
          return done(null, false, req.flash('loginMessage', 'Wrong email or Password'));
        }
        const localJSON = local.toJSON();
        if (!compareSync(password, localJSON.password)) {
          return done(null, false, req.flash('loginMessage', 'Wrong email or Password'));
        }
        const userId = localJSON.user_id;
        new User({ id: userId })
            .fetch()
            .then((user) => {
              const userJSON = user.toJSON();
              return done(null, userJSON);
            })
            .catch(err => done(err));
        return undefined;
      })
      .catch(err => done(err));
  }));
};
