var express = require('express');
var app = express();

/**
 * settings: 
 * env Environment mode, defaults to process.env.NODE_ENV (NODE_ENV environment variable) or "development"
 * trust proxy Enables reverse proxy support, disabled by default
 * jsonp callback name Changes the default callback name of ?callback=
 * json replacer JSON replacer callback, null by default
 * case sensitive routing Enable case sensitivity, disabled by default, treating "/Foo" and "/foo" as the same
 * strict routing Enable strict routing, by default "/foo" and "/foo/" are treated the same by the router
 * view cache Enables view template compilation caching, enabled in production by default
 * view engine The default engine extension to use when omitted
 * views The view directory path, defaulting to "process.cwd() + '/views'" 
 * methods:
 * app.set(name, value) Assigns setting name to value.
 * app.get(name) Get setting name value.
 * app.enable(name) Set setting name to true.
 * app.disable(name) Set setting name to false.
 * app.enabled(name) Check if setting name is enabled.
 * app.disabled(name) Check if setting name is disabled.
 * */
app.get('/', function(req, res) {
    res.send('hello world');
});
app.get('/get', function(req, res) {
    res.send('get data');
});
app.listen(80);
