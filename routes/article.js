var mysql = require('mysql');
var Post = require('../model/post');



function escape2Html(str) {
    var arrEntities = {
        'lt': '<',
        'gt': '>',
        'nbsp': ' ',
        'amp': '&',
        'quot': '"'
    };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
        return arrEntities[t];
    });
}
exports.view = function(req, res, next) {
    var page = req.query.page;
    if (page == undefined) {
        page = 1;
    }
    var post = new Post();
    post.findall(page, function(err, result) {
        if (err) {
            res.send('not found');
            return;
        }
        post.count('1=1', function(err, result2) {
            var pager = {};
            pager.pagePath = '/articles/?';
            pager.pageSize = 10;
            pager.pageCurrent = page;
            pager.maxNum = (result2 && result2[0] ? result2[0].count : 0);
            pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));
            if (!result || result.length == 0) {
                res.render('article', {
                    title: '文章不存在',
                    content: '404 not found',
                    posts: [],
                    pager: pager
                });
            } else {
                res.render('article', {
                    title: result[0]['title'],
                    content: result[0]['content'],
                    summary: result[0]['summary'],
                    posts: result,
                    pager: pager
                });
            }
        });
    });
};
exports.show = function(req, res, next) {
    var id = req.params.id;
    var post = new Post();
    post.find(id, function(err, result) {
        if (err || !result || result.length === 0) {
            res.send('not found');
            return;
        }
        res.render('show', {
            title: result[0]['title'],
            content: result[0]['content'],
            summary: result[0]['summary'],
            cover: result[0]['cover'] || ''
        })
    })
}
