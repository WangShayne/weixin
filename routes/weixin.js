var express = require('express');
var router = express.Router();
var wechat = require('wechat');
var OAuth = require('wechat-oauth');
var client = new OAuth('wxd3b6dc6c73e2e61d', '0257a41339180408957a5293b451f62f');

var url = client.getAuthorizeURL("http://shayne.tunnel.qydev.com/users","STATE","snsapi_userinfo")



var config = {
  token : 'weixin',
  appid : 'wxd3b6dc6c73e2e61d',
  appsecret :'0257a41339180408957a5293b451f62f',
  encodingAESKey : ''
};

router.use(express.query());

router.use('/', wechat(config, function(req, res, next) {
    //console.log(req.weixin);
    var message = req.weixin;
    //文本
    if(message.MsgType === "event" ){
      if(message.Event === "subscribe"){
        res.reply({
          type:"text",
          content:"谢谢关注!\<a href="+url+"\>点击访问主页</a>"
        });
      }
      if(message.Event === "CLICK"){
          switch (message.EventKey){
            case "A_text":
              res.reply({
                type:"text",
                content:"<a href="+url+">百度一下</a>"
              })
              break;
            /*case "A_image":
              res.reply({
                type:"iamge",
                content:{
                  mediaId:"Nj3_EiWh4T-TwgGV1kmJIgT6wiThaEITKYJf0cXa38o"
                }
              })
              break;*/
            case "A_news":
              res.reply([{
                title:"图文混合消息",
                description:"这块是简介",
                picurl:"http://mmbiz.qpic.cn/mmbiz_jpg/frGYu2EeZNLoHsFTkKf9Jf3I3NFT0BaNxxEDaz7jn0FrhlZFLInF3m552Obm2GDmtkaAZCWQOsqwLmWVoayqfQ/0?wx_fmt=jpeg",
                url:"https://www.baidu.com"
              }])
              break;
            case "A_music":
                res.reply({
                  title: "音乐",
                  description: "一无所有",
                  musicUrl: "http://music.163.com/#/m/song?id=22704441&userid=90498156",
                  hqMusicUrl: "http://music.163.com/#/m/song?id=22704441&userid=90498156",
                  thumbMediaId: ""
                });
                break;
          }
      }
      if(message.Event === "scancode_waitmsg"){
        var scanType,scanResult;
        message.ScanCodeInfo.ScanType === 'barcode' ? scanType = '条形码' : scanType = "二维码" ;
        scanResult = message.ScanCodeInfo.ScanResult
        res.reply({
          type:"text",
          content:"您扫的是"+scanType+"</br>值是"+scanResult
        })
      }
    }

    if(message.MsgType === "location"){
      res.reply({
        type:"text",
        content:"您所在的位置是"+message.Label
      });
    }

}));

module.exports = router;
