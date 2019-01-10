var mysql = require('mysql');
var Post = require('../model/post');

exports.view = function(req, res, next) {
	var id = req.params.id;

    var post = new Post();
	
    post.find(id,function(err,result){
        if(err){
            res.send('not found');
        }

        console.log(result);
        if(result.length==0){
        	res.render('postview', {
				title: '文章不存在',
		        content: '404 not found'
		    });
        }else{
        	res.render('postview', {
				title: result[0]['title'],
		        content: result[0]['content']
		    });
        }
        //res.send(result.length === 1 ? result[0]:result);
        
    });
};

exports.edit = function(req, res, next){
    var id = req.params.id;
    var post = new Post();
    
    post.find(id, function(err,result){
        if(err){
            res.send('not found');
        }

        console.log(result);
        if(result.length==0){
            res.render('postview', {
                title: '文章不存在',
                content: '404 not found'
            });
        }else{
            res.render('postedit', {
                title: result[0]['title'],
                content: result[0]['content'],
                summary: result[0]['summary'],
                id: result[0]['id']
            });
        }
        //res.send(result.length === 1 ? result[0]:result);
        
    });
}