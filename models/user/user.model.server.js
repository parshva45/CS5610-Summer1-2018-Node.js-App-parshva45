var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials, {username: 1});
}

function findUserByUsername(username) {
  return userModel.findOne({username: username}, {username: 1});
}

function createUser(user) {
  return userModel.create(user);
}

function findAllUsers() {
  return userModel.find();
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserByUsername: findUserByUsername,
  findUserByCredentials: findUserByCredentials
};

module.exports = api;