var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: '您未授权登陆' });
});

module.exports = router;

