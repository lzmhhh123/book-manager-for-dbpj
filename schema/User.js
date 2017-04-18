const mongoose = require('mongoose')
const md5 = require('spark-md5')

const User = new mongoose.Schema({
  create_at: Date,
  username: {
    type: String,
    validate: {
      validator: username => {
        return /[a-zA-Z0-9_]+/.test(username) && username.length >= 2
      }
      message: '{VALUE} is not a valid username (length >= 2, English characters, numbers and underscores only).'
    }
    required: [true, 'Username is required']
  },

  password: {
    type: String,
    validate: {
      validator: password => {
        return /.+/.test(password)
      },
      message: 'Password cannot be empty.'
    },
    required: [true, 'Password is required.']
  },

  status: {
    type: Number
  }

})

User.methods.checkPassword = function(pwd, next) {
  if(this.password == md5.hash(pwd)) {
    return next(null, this)
  }
  else return next(new Error, this)
}

module.exports = User
