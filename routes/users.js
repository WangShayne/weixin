var express = require('express');
var router = express.Router();
var OAuth = require('wechat-oauth');
var api = new OAuth('wxd3b6dc6c73e2e61d', '0257a41339180408957a5293b451f62f');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.query.code);
    var code = req.query.code;
    api.getAccessToken(code,function(err,result){
        var openid = result.data.openid;
        api.getUser(openid,function(err,result){
            var data = result;
            console.log(data);
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
