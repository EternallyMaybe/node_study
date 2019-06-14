var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(function(req, res) {
    res.render('index', {
        name: 'ejs'
    });
});
app.listen(3000);