/**
  * Declaration modul for app to handle project.
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users'); === not used, but will work later
var apiRouter = require('./routes/api');
var app = express();

/**
  * Mongose Setup
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gime');

/**
  * Used to handle function methods other than get.
 */
const methodOverride = require('method-override');
app.use(methodOverride ('_method'));

/**
  * Used to handle session user login.
 */
const session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000  }
}));

/**
  * Used to handle notification.
 */
const flash = require('connect-flash');
app.use(flash());

/**
  * Used to run .ejs file using enginee
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
  * Part of setup express js
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
  * Configured to serve static files from the 'public' folder
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
  * Access for template modul
 */
app.use('/sb2admin',express.static(path.join(__dirname,'node_modules/startbootstrap-sb-admin-2')));

/**
  * Access for endpoint(rute url)
 */
app.use('/api', apiRouter);
app.use('/', indexRouter);
// app.use('/users', usersRouter);

/**
  * Catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**
  * Error handling
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
