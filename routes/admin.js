
exports.index = function(req, res,next) {
	res.render('admin', {
		title: '关于网站'
    });
};