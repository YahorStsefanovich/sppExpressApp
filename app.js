var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var hbs = require("hbs");
var moment = require("moment");

var indexRouter = require('./routes/index');
var formRouter = require('./routes/form');
var birthdaysRouter = require('./routes/birthdays');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(favicon(__dirname + '/public/images/favicon.png'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/form', formRouter);
app.use('/birthdays', birthdaysRouter);

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

hbs.registerHelper("checkDate", function(value){
  var result="";
  let now = new Date(Date.now());
  now.setHours(0,0,0,0);
  
  let date = new Date(value);
  date.setFullYear(now.getFullYear());
  
  let delta = date.getTime() - now.getTime();
  var itemDate = moment(delta);
  
  if ((delta > -24*3600*1000) && (delta < 7*24*3600*1000)){
    result = `<div class="red">${itemDate.format("dddd, MMMM DD")}</div>`;
  } else
    result = `<div>${itemDate.format("dddd, MMMM DD")}</div>`;
  
  return new hbs.SafeString(result);
});

module.exports = app;
