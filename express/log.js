var express = require('express');
var app = express();
var logger = require('morgan');

/**
 * format:
 * combined、common、dev、short、tiny
 */
app.use(express.static(__dirname + '/public'));
app.use(logger('short'));
app.use(function(req, res) {
    res.send('hello world');
});
app.listen(3000);