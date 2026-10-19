/**
 * Route integration tests — no real MySQL needed.
 * All model methods are stubbed with sinon.
 *
 * Run: npm test
 */
var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');

var Post = require('../model/post');
var User = require('../model/user');
var Category = require('../model/category');
var app = require('../app');

describe('Public routes', function () {
  before(function () {
    sinon.stub(Post.prototype, 'find').callsFake(function (id, cb) {
      cb(false, [{ id: Number(id) || 1, title: 'Test Article', content: '<p>body</p>', summary: 'summary text', cover: '/static/images/movie-shawshank.jpg' }]);
    });
    sinon.stub(Post.prototype, 'findall').callsFake(function (pageOrCb, maybeCb) {
      // 兼容两种调用：findall(page, cb) 和 findall(cb)
      var cb = typeof pageOrCb === 'function' ? pageOrCb : maybeCb;
      cb(false, [
        { id: 1, title: 'Article 1', content: 'c1', summary: 's1', cover: '/static/images/movie-shawshank.jpg' },
        { id: 2, title: 'Article 2', content: 'c2', summary: 's2', cover: '' },
      ]);
    });
    sinon.stub(Post.prototype, 'count').callsFake(function (cond, cb) {
      cb(false, [{ count: 2 }]);
    });
    sinon.stub(Post.prototype, 'add').callsFake(function (title, summary, content, addtime, type, status, cover, cb) { cb(false, { affectedRows: 1 }); });
    sinon.stub(Post.prototype, 'edit').callsFake(function (id, t, s, c, at, cover, cb) { cb(false, { affectedRows: 1 }); });
    sinon.stub(Post.prototype, 'delete').callsFake(function (id, cb) { cb(false, { affectedRows: 1 }); });

    sinon.stub(Category.prototype, 'findall').callsFake(function (cond, cb) {
      cb(false, [{ id: 1, name: 'Tech' }, { id: 2, name: 'Life' }]);
    });
    sinon.stub(Category.prototype, 'find').callsFake(function (id, cb) {
      cb(false, [{ id: 1, name: 'Tech' }]);
    });
    sinon.stub(Category.prototype, 'add').callsFake(function (name, cb) { cb(false, { affectedRows: 1 }); });
    sinon.stub(Category.prototype, 'edit').callsFake(function (id, name, cb) { cb(false, { affectedRows: 1 }); });
    sinon.stub(Category.prototype, 'delete').callsFake(function (id, cb) { cb(false, { affectedRows: 1 }); });

    sinon.stub(User.prototype, 'loginbyusername').callsFake(function (u, p, cb) {
      if (u === 'admin' && p === '123456') {
        cb(false, [{ id: 1, username: 'admin' }]);
      } else {
        cb(false, []);
      }
    });
  });

  after(function () {
    sinon.restore();
  });

  describe('GET /', function () {
    it('responds 200 and contains the site title', function (done) {
      request(app)
        .get('/')
        .expect(200, function (err) {
          if (err) return done(err);
          done();
        })
        .expect(function (res) {
          expect(res.text).to.include('电影明星范');
        });
    });
  });

  describe('GET /about/', function () {
    it('responds 200 with about page', function (done) {
      request(app)
        .get('/about/')
        .expect(200, function (err) {
          if (err) return done(err);
          done();
        })
        .expect(function (res) {
          expect(res.text).to.include('关于网站');
        });
    });
  });

  describe('GET /chat/', function () {
    it('responds 200 with chat page', function (done) {
      request(app)
        .get('/chat/')
        .expect(200, function (err) {
          if (err) return done(err);
          done();
        })
        .expect(function (res) {
          expect(res.text).to.include('socket.io聊天室');
        });
    });
  });

  describe('GET /login/', function () {
    it('responds 200 with login page', function (done) {
      request(app)
        .get('/login/')
        .expect(200, function (err) {
          if (err) return done(err);
          done();
        })
        .expect(function (res) {
          expect(res.text).to.include('登录');
        });
    });
  });

  describe('GET /highcharts/', function () {
    it('responds 200', function (done) {
      request(app)
        .get('/highcharts/')
        .expect(200)
        .end(done);
    });
  });

  describe('GET /articles/', function () {
    it('responds 200 with article list', function (done) {
      request(app)
        .get('/articles/')
        .expect(200, function (err) {
          if (err) return done(err);
          done();
        })
        .expect(function (res) {
          expect(res.text).to.include('Article 1');
          expect(res.text).to.include('Article 2');
        });
    });
  });

  describe('GET /article/:id', function () {
    it('responds 200 with article detail', function (done) {
      request(app)
        .get('/article/1')
        .expect(200, function (err) {
          if (err) return done(err);
          done();
        })
        .expect(function (res) {
          expect(res.text).to.include('Test Article');
        });
    });
  });

  describe('404 handling', function () {
    it('responds 404 for unknown route', function (done) {
      request(app)
        .get('/this-route-does-not-exist')
        .expect(404, function (err) {
          if (err) return done(err);
          done();
        })
        .expect(function (res) {
          expect(res.text).to.include('Not Found');
        });
    });
  });
});

describe('Login & protected routes', function () {
  before(function () {
    sinon.stub(User.prototype, 'loginbyusername').callsFake(function (u, p, cb) {
      if (u === 'admin' && p === '123456') {
        cb(false, [{ id: 1, username: 'admin' }]);
      } else {
        cb(false, []);
      }
    });
    sinon.stub(Category.prototype, 'findall').callsFake(function (cond, cb) {
      cb(false, [{ id: 1, name: 'Tech' }, { id: 2, name: 'Life' }]);
    });
    sinon.stub(Category.prototype, 'find').callsFake(function (id, cb) {
      cb(false, [{ id: 1, name: 'Tech' }]);
    });
  });

  after(function () {
    sinon.restore();
  });

  describe('POST /login/handle/', function () {
    it('returns result:true for valid credentials', function (done) {
      request(app)
        .post('/login/handle/')
        .type('json')
        .send({ username: 'admin', password: '123456' })
        .expect(200, function (err, res) {
          if (err) return done(err);
          expect(res.body.result).to.equal(true);
          done();
        });
    });

    it('returns result:false for invalid credentials', function (done) {
      request(app)
        .post('/login/handle/')
        .type('json')
        .send({ username: 'admin', password: 'wrong' })
        .expect(200, function (err, res) {
          if (err) return done(err);
          expect(res.body.result).to.equal(false);
          done();
        });
    });
  });

  describe('GET /category/ without session', function () {
    it('redirects to /login/', function (done) {
      request(app)
        .get('/category/')
        .expect(302, function (err, res) {
          if (err) return done(err);
          expect(res.headers.location).to.equal('/login/');
          done();
        });
    });
  });

  describe('GET /category/ with valid session', function () {
    it('responds 200 with categories (using login cookie)', function (done) {
      var agent = request.agent(app);

      // Step 1: login to obtain the session cookie
      agent
        .post('/login/handle/')
        .type('json')
        .send({ username: 'admin', password: '123456' })
        .expect(200)
        .end(function (err) {
          if (err) return done(err);

          // Step 2: the agent carries the cookie, now access the protected route
          agent
            .get('/category/')
            .expect(200)
            .end(function (err2, res2) {
              if (err2) return done(err2);
              expect(res2.text).to.include('Tech');
              done();
            });
        });
    });
  });
});
