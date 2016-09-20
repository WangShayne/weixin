var fs = require('fs')
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var WechatAPI = require('wechat-api');


var api = new WechatAPI('wxd3b6dc6c73e2e61d', '0257a41339180408957a5293b451f62f')
api.getAccessToken(function (err, token) {
    console.log(err);
    console.log(token);
});

/*var img = "./src/img/head10.jpg";
api.uploadMaterial(img,'image',function(err,result){
  console.log(err)
  console.log(result)
})*/

/*var mp3 = "./src/music/RolyPoly.mp3"
api.uploadMaterial(mp3,'voice',function(err,result){
  console.log(err)
  console.log(result)
})*/


var menu = JSON.stringify(require("./src/json/menu.json"));
api.createMenu(menu,function(err,result){
  console.log(err)
  console.log(result)
})


var routes = require('./routes/index');
var users = require('./routes/users');
var weixin = require('./routes/weixin');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/weixin',weixin)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
