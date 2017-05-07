var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('express-cors');
var fs = require('fs')

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'lzmhhh123',
  name: 'book-manager-for-dbpj',
  cookie: {maxAge: 1000*6000},
  resave: false,
  saveUninitialized: true,
}));

app.get('/app', (req, res) => {
  const PATH = path.join(__dirname, 'public', 'build', 'index.html')
  fs.readFile(PATH, (err, data) => {
    res.send((data.toString()).replace('<script', '<script>window.z ='  + JSON.stringify(req.session.user) + ';</script><script'))
  })
})
app.use('/app', express.static(path.join(__dirname, 'public', 'build')));

app.use('/', require('./routes/auth'))
app.use('/', require('./routes/books'))
app.use('/', require('./routes/bill'))
app.use('/', require('./routes/user'))
app.use('/', require('./routes/editprofile'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
