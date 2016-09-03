exports.view = function(req, res) {
    res.render('chat', {
        title: 'socket.io聊天室'
        //userlist: userlist
    });
};