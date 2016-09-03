
exports.view = function(req, res,next) {
	res.render('about', {
		title: '关于网站'
    });
};