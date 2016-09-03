var mysql = require('mysql');
var Post = require('../model/post');

exports.view = function(req, res,next) {
	var post = new Post();
	
    post.findall(function(err,result){
        if(err){
            res.send('not found');
        }

        console.log(result);
        if(result.length==0){
        	res.render('category', {
				title: '文章不存在',
		        content: '404 not found'
		    });
        }else{
        	res.render('category', {
				title: result[0]['title'],
		        content: result[0]['content'],
                posts:result
		    });
        }
        //res.send(result.length === 1 ? result[0]:result);
        
    });
};