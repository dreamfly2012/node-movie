// 实现与MySQL交互
var mysql = require('mysql');
var conf = require('../conf/conf');
// 使用连接池，提升性能
var pool = mysql.createPool(conf.mysql);
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

Post.prototype.count = function(condition, callback) {
    var sql = "SELECT count(*) as count FROM post WHERE " + condition;
    console.log(sql);
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


Post.prototype.findall = function(page, callback) {
    var sql = "SELECT * FROM post order by id desc limit " + (page-1)*10 + "," + page*10;
    console.log(sql);
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
Post.prototype.add = function(title, summary, content, addtime, callback) {
    var sql = 'INSERT INTO post(title, summary, content, addtime) VALUES(?,?,?,?)';
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [title, summary, content, addtime], function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
}
Post.prototype.edit = function(id, title, summary, content, addtime, callback) {
    var sql = 'UPDATE post set title = ? , summary = ? , content = ? , addtime = ? where id = ?';
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [title, summary, content, addtime, id], function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
}

Post.prototype.delete = function(id, callback) {
    var sql = 'delete from post where id = ?';
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
}
module.exports = Post;