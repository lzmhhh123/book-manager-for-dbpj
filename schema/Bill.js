const mongoose = require('mongoose')

const Bill = new mongoose.Schema({

  income: {
    type: Number
  },

  date: {
    type: Date
  }

})

module.exports = Bill
