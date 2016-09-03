// 实现与MySQL交互
var mysql = require('mysql');
var conf = require('../conf/conf');
var $sql = {
    // insert:'INSERT INTO post(id, name, age) VALUES(0,?,?)',
    // update:'update post set name=?, age=? where id=?',
    // delete: 'delete from post where id=?',
    // queryById: 'select * from post where id=?',
    // queryAll: 'select * from post'  
};

// 使用连接池，提升性能
var pool = mysql.createPool(
    conf.mysql
);


var User = function() {};

User.prototype.loginbyusername = function(username,password, callback) {
    var sql = "SELECT * FROM user WHERE username =? and password = md5(?)";
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [username,password], function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
};

User.prototype.add = function(username,password,isadmin){
	var sql = 'INSERT INTO user(id, username, password, isadmin, addtime) VALUES(0,?,?,?,?)';
	pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [username,password,isadmin,addtime], function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
}

module.exports = User;