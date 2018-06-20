var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials, {username: 1});
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUserByUsername(username) {
  return userModel.findOne({username: username}, {username: 1});
}

function createUser(user) {
  return userModel.create(user);
}

function updateProfile(profile) {
  return userModel.update({
    _id: profile._id
  }, {
    $set: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber,
      email: profile.email,
      address: profile.address
    }
  });
}

function findAllUsers() {
  return userModel.find();
}

function deleteUserById(userId) {
  return userModel.remove({
    _id: userId
  })
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserByUsername: findUserByUsername,
  findUserByCredentials: findUserByCredentials,
  updateProfile: updateProfile,
  findUserById: findUserById,
  deleteUserById: deleteUserById
};

module.exports = api;