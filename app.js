var koa          = require('koa');
var logger = require('koa-logger');
var staticServer = require('koa-static');
var bodyParser = require('koa-bodyparser');
var _            = require('underscore');
var Promise      = require('bluebird');
var path         = require('path');
var fs           = Promise.promisifyAll(require('fs'));
var app          = koa();
var router = require('./src/router')();
/*
var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://localhost:27017/uums");
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});
*/




//我们的最简单的存储方式
var todos = [];
//获取唯一的 id 值
var counter = (function() {
    var count = 0;
    return function() {
        count++;
        return count;
    }
})();
//处理静态资源文件夹
app.use(logger());
app.use(staticServer(path.join(__dirname, 'public')));
app.use(bodyParser({
    jsonLimit: '50mb',
    formLimit: '50mb',
    textLimit: '50mb'
}));
app.use(router.routes());


app.listen(process.env.PORT || 4444);
console.log(process.env.PORT?process.env.PORT:'4444');