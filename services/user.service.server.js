module.exports = function (app) {
  app.get('/api/user', findAllUsers);
  app.get('/api/user/:username', findUserByUsername);
  app.post('/api/register', createUser);
  app.get('/api/profile', getProfile);
  app.put('/api/profile', updateProfile);
  app.post('/api/logout', logout);
  app.post('/api/login', login);

  var userModel = require('../models/user/user.model.server');

  function login(req, res) {
    var credentials = req.body;
    userModel
      .findUserByCredentials(credentials)
      .then(function (user) {
        req.session['currentUser'] = user;
        res.json(user);
      })
  }

  function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }

  function findUserByUsername(req, res) {
    var username = req.params['username'];
    userModel.findUserByUsername(username)
      .then(function (user) {
        res.json(user);
      })
  }

  function getProfile(req, res) {
    userModel.findUserById(req.session['currentUser'])
      .then(function (user) {
        res.json(user);
      })
  }

  function updateProfile(req, res) {
    var profile = req.body;
    userModel.updateProfile(profile)
      .then(res.sendStatus(200));
  }

  function createUser(req, res) {
    var user = req.body;
    user['userType'] = 'Student';
    userModel.createUser(user)
      .then(function (user) {
        req.session['currentUser'] = user;
        res.send(user);
      })
  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.send(users);
      })
  }
}
