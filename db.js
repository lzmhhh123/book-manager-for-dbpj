var mongoose = require('mongoose');

//Set up default mongoose connection
var mongDB = 'mongodb://127.0.0.1/book-manager-for-dbpj';
mongoose.connect(mongDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const User = require('./schema/User')
const Books = require('./schema/Books')
const Bill = require('./schema/Bill')

module.exports = {
  User: mongoose.model('User', User),
  Books: mongoose.model('Books', Books),
  Bill: mongoose.moduk('Bill', Bill)
}
