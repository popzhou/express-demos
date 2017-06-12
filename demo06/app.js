var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var routes = require('./routes/routes');
var apiRoutes = require('./api/allApi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', routes.index);
app.use('/user', routes.user);
app.use('/api/blog', apiRoutes.blogApi);
app.use('/api/user', apiRoutes.userApi);

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