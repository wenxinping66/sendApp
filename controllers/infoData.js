'use strict'
var createInfo = require("../createArtical");
/*exports.userInfo = function *(next) {

    var that = this;
    var module = parseInt(this.request.body.module);
    var body = this.request.body.value;
    //结果集
    var results = [];
    switch (module) {
        case 0:
        { //用户信息
            var skip = parseInt(body.start);
            var count = parseInt(body.count);
            var sort = '0';
            //排序
            if (body.sortord.column) {
                if (body.sortord.column == 'status') {
                    body.sortord.column = 'state';
                }
                sort = body.sortord.type == 'asc' ? '' : '-';
                sort += body.sortord.column.trim();
            }
            var users;
            if (body.keyword) {
                var reg = new RegExp(body.keyword, 'i');
                var total = yield createInfo.User.find({
                    $or: [
                        {
                            loginname: {$regex: reg},
                        },
                        {
                            mobilephone: {$regex: reg}
                        }
                    ]
                }).count();
                users = yield createInfo.User.find({
                    $or: [
                        {
                            loginname: {$regex: reg},
                        },
                        {
                            mobilephone: {$regex: reg}
                        }
                    ]
                }).sort(sort).skip(skip).limit(count).exec();

            } else {
                var total = yield createInfo.User.count().exec();
                users = yield createInfo.User.find({}).sort(sort).skip(skip).limit(count).exec();
            }


            if (users.length > 0) {
                this.body = {
                    "resulttype": "1",
                    "success": true,
                    "draw": body.draw,
                    "value": {
                        "status": "1",
                        "total": total,
                        "results": users
                    }
                }
            } else {
                this.body = this.body = {
                    "resulttype": "1",
                    "success": true,
                    "draw": body.draw,
                    "value": {
                        "status": "1",
                        "total": total,
                        "results": []
                    }
                }
            }

            /!*var id = 20160000 + (body.page - 1) * body.count;

             for (var i = 0; i < body.count; i++) {
             var state = Math.round(Math.random());
             id++;
             var obj = {
             "ordernumber": 1,
             "id": id,
             "loginname": id + "@qq.com",
             "phone": "133" + id,
             "username": "北京北京",
             "registertime": "2016-20-21",
             "state": state
             }

             results.push(obj);
             }
             this.body = {
             "resulttype": "1",
             "success": true,
             "draw": body.draw,
             "value": {
             "status": "1",
             "total": 27233,
             "results": results,
             }
             }*!/
        }
            break;
        case 2:
        {
            var skip = parseInt(body.start);
            var count = parseInt(body.count);
            //排序
            if (body.sortord.column) {
                if (body.sortord.column == 'status') {
                    body.sortord.column = 'state';
                }
                sort = body.sortord.type == 'asc' ? '' : '-';
                sort += body.sortord.column.trim();
            }
            var total = yield createInfo.App.count().exec();
            var apps = yield createInfo.App.find({}).sort(sort).skip(skip).limit(count).exec();


            //var id = (body.page - 1) * body.count;
            //for (var i = 0; i < body.count; i++) {
            //    id++;
            //    var obj = {
            //        "appname": "天地图"+id,
            //        "appurl": "http://www.tianditu.com",
            //        "registertime": "2016-20-21",
            //    }
            //
            //    results.push(obj);
            //}
            this.body = {
                "resulttype": "1",
                "success": true,
                "draw": body.draw,
                "value": {
                    "status": "1",
                    "total": total,
                    "results": apps,
                }
            }
        }
            break;
        case 3:
        {
            if (body.appname == '' || body.appurl == '') {
                this.body = '应用名称或应用地址为空';
                return;
            }

            var app = new createInfo.App();
            app.appname = body.appname;
            app.appurl = body.appurl;
            var thisApp = yield createInfo.App.find({
                $or: [
                    {appname: app.appname},
                    {appurl: app.appurl}
                ]
            }).exec();
            if (thisApp.length > 0) {
                this.body = "已存在"
                return;
            }
            try {
                app.save();
            } catch (e) {
                this.body = {
                    success: false
                };
                return;
            }

            /!*  for(var i=0; i<200; i++) {
             var da = 'agcdefghijklmnopqrstuvwxyz0123456789';
             var c = '';
             for(var j=0; j<10;j++) {
             var pos = parseInt(Math.random()*da.length);
             c+=da[pos];
             }
             var app = new createInfo.App();
             app.appname = c;
             app.appurl = "http://www.tianditu.com/"+c+'/';
             var thisApp = yield createInfo.App.find({appname: app.appname}).exec();
             if(thisApp.length>0) {
             this.body = "已存在该用户"
             return;
             }
             try {
             app.save();
             }catch (e) {
             this.body = {
             success: false
             };
             return;
             }
             }*!/
            this.body = {
                success: true
            }
        }
            break;
        case 4:
        { //应用修改
            var appid = body.appid;
            var appurl = body.appurl;
            var appname = body.appname
            try {
                var thisUser = yield createInfo.App.findOneAndUpdate({appid: appid}, {
                    appname: appname,
                    appurl: appurl
                });
                this.body = {
                    success: true
                }
            } catch (e) {
                this.body = {
                    success: false
                }
            }
        }
            break;
        case 5:
        { //应用删除
            var appid = body.appid;
            try {
                yield createInfo.App.remove({appid: appid});
                this.body = {
                    success: true
                }
            } catch (e) {
                this.body = {
                    success: false
                }
            }
        }
            break;
        case 6: { //敏感词查询
            var skip = parseInt(body.start);
            var count = parseInt(body.count);
            //排序
            if (body.sortord.column) {
                if (body.sortord.column == 'status') {
                    body.sortord.column = 'state';
                }
                sort = body.sortord.type == 'asc' ? '' : '-';
                sort += body.sortord.column.trim();
            }
            var total = yield createInfo.Words.count().exec();
            var words = yield createInfo.Words.find({}).sort(sort).skip(skip).limit(count).exec();
            this.body = {
                "resulttype": "1",
                "success": true,
                "draw": body.draw,
                "value": {
                    "status": "1",
                    "total": total,
                    "results": words,
                }
            }
        }break;
        case 7: //敏感词新增
        {
            if (!body.word) {
                this.body = '敏感词不能为空';
                return;
            }

            var words = new createInfo.Words();
            words.word = body.word;
            words.description = body.description;
            var thisWords = yield createInfo.Words.find({
                $or: [
                    {word: words.word},
                    {description: words.description}
                ]
            }).exec();
            if (thisWords.length > 0) {
                this.body = "已存在"
                return;
            }
            try {
                words.save();
            } catch (e) {
                console.log(e)
                this.body = {
                    success: false
                };
                return;
            }
            this.body = {
                success: true
            }
        }break;
        case 8: { //敏感词修改
            var wordsid = body.wordsid;
            var description = body.description;
            var word = body.word
            try {
                var thisUser = yield createInfo.Words.findOneAndUpdate({wordsid: wordsid}, {
                    description: description,
                    word: word
                });
                this.body = {
                    success: true
                }
            } catch (e) {
                this.body = {
                    success: false
                }
            }
        }break;
        case 9: { //敏感词删除
            var wordid = body.wordid;
            try {
                yield createInfo.Words.remove({wordid: wordid});
                this.body = {
                    success: true
                }
            } catch (e) {
                this.body = {
                    success: false
                }
            }
        }

    }

}*/


/*
//用户添加
exports.userAdd = function *(next) {
    var body = this.request.body;
    var user = new createInfo.User();
    user.loginname = body.loginname;
    user.mobilephone = body.mobilephone;
    user.username = body.username;
    user.state = Math.round(Math.random()); //状态0或者1


    var thisUser = yield createInfo.User.find({loginname: user.loginname}).exec();
    if (thisUser.length > 0) {
        this.body = "已存在该用户"
        return;
    }
    try {
        user.save();
    } catch (e) {
        this.body = {
            success: false
        };
        return;
    }
    this.body = {
        success: true
    }
};

*/




exports.save = function *(next) {
    var body = this.request.body;
    var title = body.title;
    var html = body.html;
    var artAllHtml = body.artAllHtml;
    if(!title) {
        this.body = {
            success: false,
            res: '文章名称不能为空'
        };
        return;
    }
    try {
        var thisArt = yield createInfo.Art.findOne({artname: title});
        var state ;
        if(thisArt) {
            try {
                yield createInfo.Art.findOneAndUpdate({artname: title},{ artbody : html,artAllHtml:artAllHtml});
                state = 1;
            } catch (e) {
                this.body = {
                    success: false,
                    res: '更新失败'
                };
                return;
            }

        }else{
            //添加 state: 2
            var art = new createInfo.Art();
            art.artname = title;
            art.artbody = html;
            art.artAllHtml = artAllHtml;
            try {
                art.save();
                state = 2;
            } catch (e) {
                this.body = {
                    success: false
                };
                return;
            }
        }
        this.body = {
            success: true,
            state: state
        }
    } catch (e) {
        this.body = {
            success: false
        }
    }
};

exports.allArticle = function *(next) {
    var body = this.request.body;

    try{
        var thisArt = yield createInfo.Art.find({},['artname']);;
        this.body = {
            artnames: thisArt
        }
    }catch (e) {
        this.body = {
            success: false
        }
    }
};
exports.getArt = function *(next) {
    var body = this.request.body;
    var artname = body.artname;
    try{
        var thisArt = yield createInfo.Art.findOne({artname: artname},['artbody']);;
        this.body = thisArt
    }catch (e) {
        this.body = {
            success: false
        }
    }
}

exports.delArt = function *(next) {
    var body = this.request.body;
    var artname = body.artname;
    try {
        yield createInfo.Art.remove({artname: artname});
        this.body = {
            success: true
        }
    } catch (e) {
        this.body = {
            success: false
        }
    }
};
exports.artAllHtml = function *(next) {
    var artname = this.params.artname;
    try {
        var thisArt = yield createInfo.Art.findOne({artname: artname},['artAllHtml']);
        this.body = thisArt.artAllHtml
    } catch (e) {
        this.body = {
            success: false
        }
    }
};
exports.artPreview = function *(next) {
    var artname = this.params.artname;

};
