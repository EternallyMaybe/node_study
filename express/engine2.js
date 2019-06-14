const express = require('express');
const app = express();
const cons = require('consolidate');
const path = require('path');

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', cons.ejs);

app.use(function(req, res) {
    res.render('index', {
        name: 'ejs'
    });
});

app.listen(3000);