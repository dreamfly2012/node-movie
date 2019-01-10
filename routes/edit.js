var mysql = require('mysql');
var Post = require('../model/post');
exports.view = function(req, res, next) {
    //var uid = req.session.uid;
    if (req.session && req.session.uid) {
        var post = new Post();
        post.findall(function(err, result) {
            if (err) {
                res.send('not found');
            }
            console.log(result);
            if (result.length == 0) {
                res.render('category', {
                    title: '文章不存在',
                    content: '404 not found'
                });
            } else {
                req.session.uid = req.session.uid;
                res.render('category', {
                    title: result[0]['title'],
                    content: result[0]['content'],
                    posts: result
                });
            }
            //res.send(result.length === 1 ? result[0]:result);
        });
    } else {
        res.redirect('/login/');
    }
};
exports.edit_do = function(req, res, next) {
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    var summary = req.body.summary;
    var post = new Post();
    var time = new Date();
    post.edit(id, title, summary, content, time, function(err, result) {
        console.log("编辑文章的结果:" + result);
        res.redirect('/list/');
    });
}