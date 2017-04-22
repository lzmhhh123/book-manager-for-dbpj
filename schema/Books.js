const mongoose = require('mongoose')

const Books = new mongoose.Schema({

  isbn: {
    type: String
  },

  number: {
    type: Number
  },

  name: {
    type: String
  },

  author: {
    type: String
  },

  publishing_house: {
    type: String
  }

})

module.exports = Books
