var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
var autoIncrement = require('mongoose-auto-increment');   //自增ID 模块
var connection = mongoose.connect("mongodb://wfung:wxp342516@ds129010.mlab.com:29010/send");
autoIncrement.initialize(connection);
//应用
var artSchema = new mongoose.Schema({
    artid: {type:Number, index: true},
    artname: {type: String},
    artbody: {type: String},
    artAllHtml: {type: String},
    addtime: {type: Date, default: new Date()},
});
artSchema.plugin(autoIncrement.plugin, {model:"Art", field: 'artid', startAt: 1000});
mongoose.model("Art", artSchema);
var Art = mongoose.model("Art");

exports.Art = Art;