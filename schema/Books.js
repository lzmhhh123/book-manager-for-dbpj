const mongoose = require('mongoose')

const Books = new mongoose.Schema({

  isbn: {
    type: String
  },

  number: {
    type: Number
  },

  price: {
    type: Number
  },

  status: {
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
