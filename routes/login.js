var mysql = require('mysql');
var User = require('../model/user');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();



// see https://github.com/expressjs/body-parser
// 添加 body-parser 中间件就可以了
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());

exports.index = function(req, res,next) {
	res.render('login', {
		title: '登录'
    });
};

exports.handle = function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;
	console.log(username);
	var user = new User();

	user.loginbyusername(username,password,function(err,result){
        if(err){
            res.json({result: err});
        }

        console.log(result);
        if(result==undefined || result.length==0){
            console.log('result null');
        	res.json({result: false});
        }else{
            req.session.uid = result[0].id;
            console.log(req.session.uid);
        	res.json({result: true});
        }
        //res.send(result.length === 1 ? result[0]:result);
        
    });
}