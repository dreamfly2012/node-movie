var userlist = [{
    'name': 'jerry',
    'age': 15
}, {
    'name': 'tom',
    'age': 15
}];
// app.param(['id', 'age'], function (req, res, next, value) {
//   console.log('CALLED ONLY ONCE with', value);
//   next();
// })
exports.list = function(req, res) {
    res.render('showuser', {
        title: 'Users',
        users: users
    });
};
exports.view = function(req, res) {
    res.render('showuser', {
        title: '用户列表页',
        userlist: userlist
    });
};
exports.edit = function(req, res) {
    res.render('edituser', {
        title: '用户编辑',
        user: req.name
    });
};
exports.update = function(req, res) {
    // Normally you would handle all kinds of
    // validation and save back to the db
    var user = req.body.user;
    req.user.name = user.name;
    req.user.email = user.email;
    res.redirect('back');
};