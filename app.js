var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var site = require('./routes/index');
var user = require('./routes/user');
var post = require('./routes/post');
var highcharts = require('./routes/highcharts');
var category = require('./routes/category');
var login  = require('./routes/login');
var about = require('./routes/about');
var chat = require('./routes/chat');
var admin = require('./routes/admin');

var app = express();

var ejs = require('ejs');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//静态文件
app.use('/static', express.static('public'));
app.use('/semantic', express.static('semantic'));

app.get('/', site.index);
app.get('/highcharts/',highcharts.view);
app.get('/user/:name', user.view);
app.get('/user/:name/edit', user.edit);
app.get('/category/', category.view);
app.get('/post/:id', post.view);
app.get('/admin/',admin.index);
app.get('/login/',login.index);
app.post('/login/handle/',login.handle);
app.get('/about/',about.view);
app.get('/chat/',chat.view);


// app.all('/user/:id/:op?', user.load);
// app.get('/user/:id', user.view);
//app.listen(40000);


//var http = require('http');


// app.put('/user/:id/edit', user.update);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});
//}

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;