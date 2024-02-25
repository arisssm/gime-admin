/**
 * Declaration modul for app to handle project.
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var app = express();

//mongoose setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gime');

// for method expect get;
const methodOverride = require('method-override');
app.use(methodOverride ('_method'));

// for session auth
const session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// connect-flash
const flash = require('connect-flash');
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// part of setup express js
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// configured to serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// access for template modul
app.use('/sb2admin',express.static(path.join(__dirname,'node_modules/startbootstrap-sb-admin-2')));

// access for rute this app
app.use('/api', apiRouter);
app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
