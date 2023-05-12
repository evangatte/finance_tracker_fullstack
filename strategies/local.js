const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

passport.use(
  new LocalStrategy(
      {
          usernameField: 'email',
          passReqToCallback: true,
      },

      async function (req, username, password, done) {
          User.findOne({ email: username }, (err, user) => {
              if (err) {
                  return done(err);
              }
              if (!user) {
                  return done(null, false, { message: 'Incorrect username' });
              }
              bcrypt.compare(password, user.password, (err, res) => {
                  if (res) {
                      // passwords match! log user in
                      return done(null, user);
                  }
                  // passwords do not match!
                  return done(null, false, { message: 'Incorrect password' });
              });
          });
      },
  ),
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});