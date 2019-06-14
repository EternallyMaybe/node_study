const express = require('express');
const app = express();

// 通用配置
// app.param(function(name, fn){
//     if (fn instanceof RegExp) {
//         return function(req, res, next, val){
//             var captures;
//             if (captures = fn.exec(String(val))) {
//                 req.params[name] = captures;
//                 next();
//             } else {
//                 next('route');
//             }
//         }
//     }
// });
// app.param('id', /^\d+$/);

// 单独配置
app.param('id', function(req, res, next, val){
    let regExp = /^\d+$/;
    let captures;
    if (captures = regExp.exec(String(val))) {
        req.params.id = captures;
        next();
    } else {
        // 如果某一个callback执行了next('route')，它后面的callback就被忽略
        next('route');
    }
});

app.get('/user/:id', function(req, res){
    res.send('user ' + req.params.id);
});
  
app.listen(3000);