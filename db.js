var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/book-manager-for-dbpj';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const User = require('./schema/User')
const books = require('./schema/books')

module.exports = {
  User: mongoose.module('User', User)
  books: mongoose.module('Books', Books)
}
