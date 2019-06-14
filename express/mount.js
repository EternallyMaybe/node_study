var express = require('express');
var app = express();

app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});

app.use('/static', express.static(__dirname + '/public'));

app.listen(3000);