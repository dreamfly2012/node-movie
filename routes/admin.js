var cookieParser = require('cookie-parser');
var session = require('express-session');


exports.index = function(req, res,next) {
	if(req.session.uid) {
		res.render('admin', {
			title: '关于网站'
	    });
	} else {
		res.redirect('/login/');
	}

};