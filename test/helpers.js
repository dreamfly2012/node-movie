/**
 * Test helpers: mock MySQL models so tests don't need a real database.
 */
var Post = require('../model/post');
var User = require('../model/user');
var Category = require('../model/category');
var sinon = require('sinon');

/**
 * Stub all Post prototype methods to avoid real DB calls.
 * @returns {Object} of sinon stubs
 */
function mockPost() {
  var findStub = sinon.stub(Post.prototype, 'find').callsFake(function(id, cb) {
    cb(false, [{ id: 1, title: 'Test Article', content: '<p>content</p>', summary: 'summary' }]);
  });
  var findallStub = sinon.stub(Post.prototype, 'findall').callsFake(function(page, cb) {
    cb(false, [
      { id: 1, title: 'Article 1', content: 'c1', summary: 's1' },
      { id: 2, title: 'Article 2', content: 'c2', summary: 's2' }
    ]);
  });
  var countStub = sinon.stub(Post.prototype, 'count').callsFake(function(cond, cb) {
    cb(false, [{ count: 2 }]);
  });
  var addStub = sinon.stub(Post.prototype, 'add').callsFake(function(t, s, c, at, cb) {
    cb(false, { affectedRows: 1 });
  });
  var editStub = sinon.stub(Post.prototype, 'edit').callsFake(function(id, t, s, c, at, cb) {
    cb(false, { affectedRows: 1 });
  });
  var deleteStub = sinon.stub(Post.prototype, 'delete').callsFake(function(id, cb) {
    cb(false, { affectedRows: 1 });
  });

  return {
    find: findStub,
    findall: findallStub,
    count: countStub,
    add: addStub,
    edit: editStub,
    delete: deleteStub,
  };
}

function mockUser() {
  var loginStub = sinon.stub(User.prototype, 'loginbyusername').callsFake(function(u, p, cb) {
    if (u === 'admin' && p === '123456') {
      cb(false, [{ id: 1, username: 'admin' }]);
    } else {
      cb(false, []);
    }
  });
  return { login: loginStub };
}

function mockCategory() {
  var findallStub = sinon.stub(Category.prototype, 'findall').callsFake(function(cond, cb) {
    cb(false, [{ id: 1, name: 'Tech' }, { id: 2, name: 'Life' }]);
  });
  var findStub = sinon.stub(Category.prototype, 'find').callsFake(function(id, cb) {
    cb(false, [{ id: 1, name: 'Tech' }]);
  });
  var addStub = sinon.stub(Category.prototype, 'add').callsFake(function(name, cb) {
    cb(false, { affectedRows: 1 });
  });
  var editStub = sinon.stub(Category.prototype, 'edit').callsFake(function(id, name, cb) {
    cb(false, { affectedRows: 1 });
  });
  var deleteStub = sinon.stub(Category.prototype, 'delete').callsFake(function(id, cb) {
    cb(false, { affectedRows: 1 });
  });
  return {
    findall: findallStub,
    find: findStub,
    add: addStub,
    edit: editStub,
    delete: deleteStub,
  };
}

/**
 * Create an Express app with mocked models, ready for supertest.
 * @param {string} sessionUid - optional session uid to simulate logged-in user
 */
function createTestApp(sessionUid) {
  var app = require('../app');

  // Inject a fake session
  app.use(function fakeSession(req, res, next) {
    if (sessionUid) {
      req.session = { uid: sessionUid };
    } else {
      req.session = {};
    }
    next();
  });

  return app;
}

module.exports = {
  mockPost: mockPost,
  mockUser: mockUser,
  mockCategory: mockCategory,
  createTestApp: createTestApp,
};
