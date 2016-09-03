var mysql = require('mysql');
var Post = require('../model/post');

exports.view = function(req, res,next) {
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