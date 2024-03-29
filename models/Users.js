
const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
});

module.exports = Users = mongoose.model('users', UsersSchema);