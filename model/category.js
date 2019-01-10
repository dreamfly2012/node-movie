// 实现与MySQL交互
var mysql = require('mysql');
var conf = require('../conf/conf');
// 使用连接池，提升性能
var pool = mysql.createPool(conf.mysql);
var Category = function() {};
Category.prototype.find = function(id, callback) {
    var sql = "SELECT * FROM category WHERE id =?";
    console.log(sql);
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

Category.prototype.count = function(condition, callback) {
    var sql = "SELECT count(*) as count FROM category WHERE " + condition;
    console.log(sql);
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [], function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
};


Category.prototype.findall = function(page, callback) {
    var number = 1000;
    var sql = "SELECT * FROM category order by id desc limit " + (page-1)*number + "," + page*number;
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
Category.prototype.add = function(name, callback) {
    var sql = 'INSERT INTO category(name) VALUES(?)';
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [name], function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
}
Category.prototype.edit = function(id, name, callback) {
    var sql = 'UPDATE category set name = ? where id = ?';
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(true);
            return;
        }
        // make the query
        connection.query(sql, [name, id], function(err, results) {
            if (err) {
                callback(true);
                return;
            }
            callback(false, results);
        });
    });
}

Category.prototype.delete = function(id, callback) {
    var sql = 'delete from category where id = ?';
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
module.exports = Category;