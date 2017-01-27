const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./schema.js');
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  { usernameField: 'username', passReqToCallback: true},
  (req, username, password, done) => {
    User.findOne({username})
      .then(user => {
        if (!user) { 
          console.log('USER DOES NOT EXIST');
          return done(null, false);
        } if (user) {
          bcrypt.compare(password, user.password, (err, equal) => {
            if (err) {
              console.log('BCRYPT ERROR: ', err);
              return done(null, false);
            } else if (!equal) {
              console.log('PASSWORDS DO NOT MATCH');
              return done(null, false);
            } 
            else {
              console.log('USER AUTHENTICATED: ', user.username);
              return done(null, user);
            }
          });
        }
      }); 
  }
))

module.exports = passport;