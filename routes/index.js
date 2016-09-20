var express = require('express');
var router = express.Router();
var OAuth = require('wechat-oauth');
var api = new OAuth('wxd3b6dc6c73e2e61d', '0257a41339180408957a5293b451f62f');

/* GET home page. */
api.getAuthorizeURL("http://shayne.tunnel.qydev.com/users","STATE","snsapi_userinfo")
router.get('/', function(req, res, next) {
  res.render('index', { title: '您未授权登陆' });
});

module.exports = router;
