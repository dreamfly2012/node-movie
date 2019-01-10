var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Post = require('../model/post');
var Category = require('../model/category');
exports.view = function(req, res, next) {
    var uid = req.session.uid;
    console.log(uid);
    if (uid) {
        var category = new Category();
        req.session.uid = uid;
        category.findall('1', function(err, result) {
            console.log(result);
            res.render('category', {
                title: '文章列表',
                categories: result
            });
        });
    } else {
        res.redirect('/login/');
    }
};

exports.add = function(req, res, next){
    var uid = req.session.uid;
    console.log(uid);
    if (uid) {
        res.render('categoryadd', {
            title: '添加分类'
        });
    } else {
        res.redirect('/login/');    
    }
}

exports.add_do = function(req, res, next){
    var uid = req.session.uid;
    if (uid) {
        req.session.uid = uid;
        var name = req.body.name;
        var category = new Category();
        category.add(name, function(err, result){
            res.redirect('/category/');
        });
    } else {
        res.redirect('/login/');    
    }
}

exports.edit = function(req, res, next){
    var uid = req.session.uid;
    var id = req.params.id;
    console.log(id);
    if (uid) {
        var category = new Category();
        category.find(id, function(err, result){
            console.log(result);
            if(result.length==0){
                res.render('postview', {
                    title: '分类不存在',
                    content: '404 not found'
                });
            }else{
                res.render('categoryedit', {
                    title: '添加分类',
                    id: result[0].id,
                    name: result[0].name
                });
            }
            
        })
    } else {
        res.redirect('/login/');    
    }
}

exports.edit_do = function(req, res, next){
    var id = req.body.id;
    var name = req.body.name;
    var uid = req.session.uid;
    if(uid) {
        var category = new Category();
        category.edit(id, name, function(err, result){
            res.redirect("/category/");
        });
    } else {
        res.redirect("/login/");
    }
}

exports.delete_do = function(req, res, next){
    var id = req.body.id;
    var uid = req.session.uid;
    if(uid) {
        var category = new Category();
        category.delete(id, function(err, result){
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

