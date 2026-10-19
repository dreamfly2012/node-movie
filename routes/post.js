var mysql = require('mysql');
var Post = require('../model/post');
var multer = require('multer');
var fs = require('fs');
var path = require('path');

// 生成 MySQL datetime 兼容的时间字符串 (YYYY-MM-DD HH:MM:SS)
function mysqlDateNow() {
  var d = new Date();
  function pad(n) { return n < 10 ? '0' + n : n; }
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
    ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}

// ---------- 封面图上传（multer） ----------
var coverDir = path.join(__dirname, '..', 'public', 'images', 'cover');
fs.mkdirSync(coverDir, { recursive: true });
var upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) { cb(null, coverDir); },
    filename: function(req, file, cb) {
      var ext = path.extname(file.originalname) || '.jpg';
      if (!/^image\//.test(file.mimetype)) {
        return cb(new Error('仅支持图片文件（jpg/png/webp/gif）'));
      }
      cb(null, 'cover-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + ext);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// 前台：查看文章
exports.view = function(req, res, next) {
	var id = req.params.id;
    var post = new Post();

    post.find(id, function(err, result){
        if(err){
            res.send('not found');
            return;
        }
        console.log(result);
        if(!result || result.length == 0){
        	res.render('postview', {
				title: '文章不存在',
		        content: '404 not found'
		    });
        } else {
        	res.render('postview', {
				title: result[0]['title'],
		        content: result[0]['content']
		    });
        }
    });
};

// 后台：编辑文章表单
exports.edit = function(req, res, next){
    var uid = req.session.uid;
    var id = req.params.id;
    if(!uid){
        res.redirect('/login/');
        return;
    }
    var post = new Post();
    post.find(id, function(err, result){
        if(err){
            res.send('not found');
            return;
        }
        console.log(result);
        if(!result || result.length == 0){
            res.render('postview', {
                title: '文章不存在',
                content: '404 not found'
            });
        } else {
            res.render('postedit', {
                title: result[0]['title'],
                content: result[0]['content'],
                summary: result[0]['summary'],
                cover: result[0]['cover'] || '',
                id: result[0]['id']
            });
        }
    });
}

// 后台：添加文章表单
exports.add = function(req, res, next){
    var uid = req.session.uid;
    if(!uid){
        res.redirect('/login/');
        return;
    }
    res.render('postadd', {
        title: '添加文章'
    });
}

// 后台：提交添加文章（封面可上传）
exports.add_do = function(req, res, next){
    var uid = req.session.uid;
    if(!uid){
        res.redirect('/login/');
        return;
    }
    upload.single('cover')(req, res, function(err){
        if(err){
            console.error('cover upload failed:', err.message);
            res.status(400).render('error', {
                message: '封面上传失败：' + err.message,
                error: err
            });
            return;
        }
        var title = req.body.title;
        var summary = req.body.summary || '';
        var content = req.body.content || '';
        var addtime = mysqlDateNow();
        var cover = req.file ? '/static/images/cover/' + req.file.filename : '';
        var post = new Post();
        // type=0 普通文章, status=0 正常
        post.add(title, summary, content, addtime, 0, 0, cover, function(err, result){
            if(err){
                console.error('add post failed:', result && result.message);
                res.status(500).render('error', {
                    message: '添加失败：' + (result && result.message ? result.message : '数据库错误'),
                    error: result
                });
                return;
            }
            res.redirect('/list/');
        });
    });
}

// 后台：提交编辑文章（封面可上传，不传则保留旧封面）
exports.edit_do = function(req, res, next){
    var uid = req.session.uid;
    if(!uid){
        res.redirect('/login/');
        return;
    }
    upload.single('cover')(req, res, function(err){
        if(err){
            console.error('cover upload failed:', err.message);
            res.status(400).render('error', {
                message: '封面上传失败：' + err.message,
                error: err
            });
            return;
        }
        var id = req.body.id;
        var title = req.body.title;
        var summary = req.body.summary || '';
        var content = req.body.content || '';
        // 上传了新封面则用新的；否则保留隐藏域里的旧封面
        var cover = req.file ? '/static/images/cover/' + req.file.filename : (req.body.cover || '');
        var addtime = mysqlDateNow();
        var post = new Post();
        post.edit(id, title, summary, content, addtime, cover, function(err, result){
            if(err){
                console.error('edit post failed:', result && result.message);
                res.status(500).render('error', {
                    message: '修改失败：' + (result && result.message ? result.message : '数据库错误'),
                    error: result
                });
                return;
            }
            res.redirect('/list/');
        });
    });
}

// 后台：文章列表
exports.list = function(req, res, next){
    var uid = req.session.uid;
    if(!uid){
        res.redirect('/login/');
        return;
    }
    var page = req.query.page;
    if (page == undefined) {
        page = 1;
    }
    var post = new Post();
    post.findall(page, function(err, result){
        post.count('1=1', function(err2, countResult){
            var pager = {};
            pager.pagePath = '/list/?';
            pager.pageSize = 10;
            pager.pageCurrent = page;
            pager.maxNum = (countResult && countResult[0] ? countResult[0].count : 0);
            pager.pageCount = parseInt(Math.ceil(parseFloat(pager.maxNum) / parseFloat(pager.pageSize)));
            res.render('list', {
                title: '文章列表',
                list: result || [],
                pager: pager
            });
        });
    });
}

// 后台：删除文章
exports.delete = function(req, res, next){
    var uid = req.session.uid;
    if(!uid){
        res.redirect('/login/');
        return;
    }
    var id = req.body.id;
    var post = new Post();
    post.delete(id, function(err, result){
        if(err){
            res.json({result: false});
        } else {
            res.json({result: !!(result && result.affectedRows)});
        }
    });
}
