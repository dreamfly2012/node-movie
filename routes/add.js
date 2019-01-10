var mysql = require('mysql');
var Post = require('../model/post');

exports.view = function(req, res, next) {
	var uid = req.session.uid;
    console.log(uid);

    if(uid) {
        res.render('postadd', {
            title: '添加文章'
        });
    } else {
        res.redirect('/login/');
    }
};

exports.add_do = function(req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    var summary = req.body.summary;
    var publish = req.body.publish;

    var post = new Post();
    var time = new Date();
    post.add(title, summary, content, time , function(err, result){
        console.log(result);
    });
    res.redirect('/list/');
}