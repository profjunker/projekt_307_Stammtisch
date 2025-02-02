var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mustacheExpress = require('mustache-express')
var pg = require('pg')
require('dotenv').config()

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var feedRouter = require('./routes/feed');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login')
var profileRouter = require('./routes/profile')
var feeddetailRouter = require('./routes/feed_detail');


const db_connection = new pg.Pool({
    host: "dpg-cu6kk48gph6c73c7o22g-a.frankfurt-postgres.render.com",
    user: "tristan",
    password: "CylE1s3YDYAREoJdB0Kr6oAOOX5qiW1E",
    database: "stammtisch_9ot6",
    port: 5432,
    ssl: true
});

//var usersRouter = require('./routes/users');

var app = express();

// Attach shared resources to requests
app.use((req, res, next) => {
    req.db_connection = db_connection; // Attach the database pool
    req.login = new Login("users", ["email", "password"], db_connection); // Attach the Login instance
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  req.db_connection = db_connection;
  next();
});

const Login = require("./model/login");



app.use('/', indexRouter);
app.use('/feed', feedRouter);
app.use('/search', searchRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/feed_detail', feeddetailRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/search', searchRouter);

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
