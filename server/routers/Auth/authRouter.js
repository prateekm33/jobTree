// base route: /auth

const passport = require('../../config/passport.js');
const authRouter = require('express').Router();
const authController = require('./authController');
const { validateRequest, hashPassword } = require('../Utils');

authRouter.route('/login')
  .post(
    passport.authenticate('local'),
    authController.logInUser
  )

authRouter.route('/logout')
  .post(
    authController.logOutUser
  )

authRouter.route('/validate')
  .get(
    validateRequest,
    authController.validateRequest);

module.exports = authRouter;