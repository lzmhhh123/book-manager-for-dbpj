const mongoose = require('mongoose')
const md5 = require('spark-md5')

const User = new mongoose.Schema({
  username: {
    type: String,
  },

  worknumber: {
    type: Number
  },

  birthday: {
    type: String
  },

  name: {
    type: String,
  },

  gender: {
    type: String,
  },

  password: {
    type: String,
  },

  status: {
    type: Number
  }

})

User.methods.checkPassword = function(pwd, next) {
  if(this.password == pwd) {
    return next(null, this)
  }
  else return next(new Error, this)
}

module.exports = User
