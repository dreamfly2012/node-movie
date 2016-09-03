// 实现与MySQL交互
var mysql = require('mysql');
var conf = require('../conf/conf');

// 使用连接池，提升性能
var pool = mysql.createPool(
    conf.mysql
);


var Post = function() {};

Post.prototype.find = function(id, callback) {
    var sql = "SELECT * FROM post WHERE id =?";
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [id], function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
};

Post.prototype.findall = function(callback) {
    var sql = "SELECT * FROM post order by id desc limit 10 ";
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
};

Post.prototype.add = function(title,summary,content,addtime){
	var sql = 'INSERT INTO post(id, title, summary, content, addtime) VALUES(0,?,?,?,?)';
	pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [title,summary,content,addtime], function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
}

module.exports = Post;