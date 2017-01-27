const passport = require('../../config/passport.js');
const {User} = require('../../config/schema.js');

module.exports = {

  validateRequest(req, res, next) {
    res.json(req.user.username);
  },

  logInUser(req, res, next) {
    if (req.user) {
      req.login(req.user, (err) => {
        if (err) res.status(401).json(null);
        else res.status(200).json(req.user.username);
      });
    }
    else return res.status(401).json(null);
  },

  logOutUser(req, res, next) {
    if (!req.user) return res.status(401).end();
    console.log('LOGGING OUT USER: ', req.user.username);
    req.logout();
    res.status(200).end();
  }
}