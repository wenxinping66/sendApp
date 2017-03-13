'use strict'
var Router = require('koa-router');
var DT = require('../controllers/infoData');

module.exports = function() {
    var router = new Router();
    router.post('/save',DT.save);
    router.get('/allArticle',DT.allArticle);
    router.post('/getArt',DT.getArt);
    router.post('/delArt',DT.delArt);
    var ueditor = require('koa-ueditor')('public');//配置ueditor
    router.all('/ueditor/ue', ueditor);
    router.get('/page/:artname',DT.artAllHtml);
    router.get('/preview/:artname',DT.artPreview)
    //router.post('/read',DT.read);
    return router
}