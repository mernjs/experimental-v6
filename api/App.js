const Utilities = require('./Utilities');
const express = require('express');
const Route = express.Router();

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
/**
 * APIs Routes
 */
Route.route('/api/login')
  .post(AuthController.login)
  .all(Utilities.send405);

Route.route('/api/signup')
  .post(AuthController.signup)
  .all(Utilities.send405);

Route.route('/api/user-details')
  .get(Utilities.verifyAccessToken, AuthController.getUserDetails)
  .all(Utilities.send405);

Route.route('/api/users/:id?')
  .get(UserController.read)
  .post(UserController.create)
  .put(UserController.update)
  .delete(UserController.delete)
  .all(Utilities.send405);

module.exports = Route;
