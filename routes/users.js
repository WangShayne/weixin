var express = require('express');
var router = express.Router();
var OAuth = require('wechat-oauth');
var wechatAPI = require('wechat-api');
var wechat = new wechatAPI('wxd3b6dc6c73e2e61d', '0257a41339180408957a5293b451f62f')
var api = new OAuth('wxd3b6dc6c73e2e61d', '0257a41339180408957a5293b451f62f');

var param = {
     debug: false,
     jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
     url: 'http://shayne.tunnel.qydev.com/users'
};


/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.query.code);
    var code = req.query.code;
    api.getAccessToken(code,function(err,result){
        var openid = result.data.openid;
        api.getUser(openid,function(err,result){
            var data = result;
            console.log(data);
            res.set('Content-Type','text/plain');
            res.render('users', {
                title: '你已经授权登陆' ,
                code:code,
                openid:openid,
                data:data
            });

        })
    })
});

module.exports = router;
