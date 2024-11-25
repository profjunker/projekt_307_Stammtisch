
const mustacheExpress = require('mustache-express');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var pg = require('pg')
require('dotenv').config()



var db_connection = pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  exit: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // Ordner für Views
app.set('view engine', 'mustache');  // Setze Mustache als Template-Engine
app.engine('mustache', mustacheExpress());  // Verwende mustache-express als Engine

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use{(req
//  req.db_connection = db_connection;
//)};

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
