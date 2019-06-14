const crypto = require('crypto');
const rp = require('request-promise');
const util = require('util');
const fs = require('fs');
const parseString = require('xml2js').parseString;
const accessTokenConfig = require('./access_token');
const menus = require('./menus');

var WeChat = function(config) {
    this.config = config;
    this.token = config.token;
    this.appID = config.appID;
    this.appSecret = config.appSecret;
    this.apiDomain = config.apiDomain;
    this.apiURL = config.apiURL;
}

WeChat.prototype.auth = function(req, res) {
    let sign = req.query.signature,
        timestamp = req.query.timestamp,
        nonce = req.query.nonce,
        echostr = req.query.echostr;

    let array = [this.token, timestamp, nonce];
    array.sort();

    const hashCode = crypto.createHash('sha1');
    let tempStr = array.join('');
    let resultCode = hashCode.update(tempStr, 'utf8').digest('hex');
    if (resultCode === sign) {
        res.send(echostr);
    } else {
        res.send('mismatch');
    }
}

WeChat.prototype.getAccessToken = function() {
    let currentTime = Date.now();
    let url = util.format(this.apiURL.accessTokenApi, this.apiDomain, this.appID, this.appSecret);

    return new Promise(function(resolve, reject) {
        if (!accessTokenConfig.access_token && accessTokenConfig.expires_time < currentTime) {
            rp(url).then(function(res) {
                let data = JSON.parse(res);
                accessTokenConfig.access_token = data.access_token;
                accessTokenConfig.expires_time = (parseInt(data.expires_in) - 200) * 1000 + currentTime;
                fs.writeFileSync('./wechat/access_token.json', JSON.stringify(accessTokenConfig));
                resolve(data.access_token);
            }).catch(function(err) {
                reject(err);
            });
        } else {
            resolve(accessTokenConfig.access_token);
        }
    })
}

WeChat.prototype.createMenus = function() {
    let that = this; 

    return this.getAccessToken().then(function(data) {
        let url = util.format(that.apiURL.createMenu, that.apiDomain, data);
        let options = {
            method: 'POST',
            uri: url,
            form: JSON.stringify(menus),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        return rp(options);
    });
}

WeChat.prototype.handleMsg = function(req, res) {
    let buffer = [];
    req.on('data', function(data) {
        buffer.push(data);
    })
    req.on('end', function() {
        parseString(Buffer.concat(buffer).toString('utf-8'), function(err, result) {
            res.send('发送成功');
        })
    })
}

module.exports = WeChat;