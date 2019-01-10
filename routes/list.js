var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Post = require('../model/post');
exports.view = function(req, res, next) {
    var uid = req.session.uid;
    var page = req.query.page;
    if (page == undefined) {
        page = 1;
    }
    console.log(uid);
    if (uid) {
        var post = new Post();
        req.session.uid = uid;
        post.count('1=1', function(err, result2) {
            var pager = {};
            pager.pagePath = '/list/?';
            pager.pageSize = 10;
            pager.pageCurrent = page;
            pager.maxNum = result2[0].count;
            //console.log(result2);
            //console.log(pager);
            pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize))); //计算总页数
            
            post.findall(page, function(err, result) {
                var list = result;
                console.log(list);
                res.render('list', {
                    title: '文章列表',
                    list: list,
                    pager:pager
                });
            });
        });
    } else {
        res.redirect('/login/');
    }
};

exports.delete_do = function(req, res, next) {
    var id = req.body.id;
    var uid = req.session.uid;
    if(uid) {
        var post = new Post();
        req.session.uid = uid;
        console.log("删除id是:"+id);
        post.delete(id, function(err, result){
            if(err) {
                res.json({result:false});
            } else {
                if (result.affectedRows) {
                    res.json({result: true});
                } else {
                    res.json({result: false});
                }
            }
        });
    } else {
        res.redirect("/login/");
    }
}