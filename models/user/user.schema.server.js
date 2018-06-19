var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  address: String,
  sections: [String],
  userType: String
}, {collection: 'user'});

module.exports = userSchema;