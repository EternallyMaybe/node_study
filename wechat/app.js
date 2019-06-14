const express = require('express');
const config = require('./config');
const WeChat = require('./wechat');
const logger = require('log4js').getLogger;
const app = express();
const wechat = new WeChat(config);
logger.level = 'debug';

app.get('/wx', function(req, res) {
    wechat.auth(req, res);
})

app.post('/wx', function(req, res) {

})

app.get('/getAccessToken', function(req, res) {
    wechat.getAccessToken().then(function(data) {
        logger.info('getAccessToken:success');
        res.send(data);
    }).catch(function(err) {
        logger.error('err:', err);
        res.send('获取access_token失败');
    });
})

app.get('/createMenus', function(req, res) {
    wechat.createMenus()
    .then(function(result) {
        logger.info('createMenus:success');
        res.send(JSON.parse(result));
    }).catch(function(err) {
        logger.error('err:', err);
        res.send('创建菜单失败');
    });
})


app.listen(80);