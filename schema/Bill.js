const mongoose = require('mongoose')

const Bill = new mongoose.Schema({

  isbn: {
    type: String
  },

  name: {
    type: String
  },

  income: {
    type: Number
  },

  date: {
    type: Date
  }

})

module.exports = Bill
