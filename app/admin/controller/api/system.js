'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _base2 = require('./base');

var _base3 = _interopRequireDefault(_base2);

var _package = require('../../../../package.json');

var _package2 = _interopRequireDefault(_package);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_request2.default.defaults({
  timeout: 1000,
  strictSSL: false,
  rejectUnauthorized: false
});
var reqIns = function reqIns(url) {
  return new _promise2.default(function (resolve, reject) {
    return _request2.default.get(url, function (err, res, body) {
      return err ? reject(res) : resolve(body);
    });
  });
};

var _class = function (_base) {
  (0, _inherits3.default)(_class, _base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _base.apply(this, arguments));
  }

  _class.prototype.init = function init(http) {
    _base.prototype.init.call(this, http);

    this.modelInstance = this.model('options');
  };

  _class.prototype.getAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var needUpdate, onlineVersion, mysql, data, where;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              needUpdate = false;
              _context.prev = 1;
              _context.next = 4;
              return reqIns('http://firekylin.org/release/.latest');

            case 4:
              onlineVersion = _context.sent;

              if (_semver2.default.gt(onlineVersion, _package2.default.version)) {
                needUpdate = onlineVersion;
              }
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](1);

              console.log(_context.t0);

            case 11:
              _context.next = 13;
              return this.modelInstance.query('SELECT VERSION() as version');

            case 13:
              mysql = _context.sent;
              data = {
                nodeVersion: process.versions.node,
                v8Version: process.versions.v8,
                platform: process.platform,
                thinkjsVersion: think.version,
                firekylinVersion: _package2.default.version,
                mysqlVersion: mysql[0].version,
                needUpdate: needUpdate
              };
              //非管理员只统计当前用户文章

              where = this.userInfo.type !== 1 ? { user_id: this.userInfo.id } : {};
              _context.t1 = this;
              _context.t2 = data;
              _context.next = 20;
              return this.getConfig();

            case 20:
              _context.t3 = _context.sent;
              _context.next = 23;
              return this.model('post').where(where).count();

            case 23:
              _context.t4 = _context.sent;
              _context.next = 26;
              return this.model('cate').count();

            case 26:
              _context.t5 = _context.sent;
              _context.next = 29;
              return this.model('post').where(where).sum('comment_num');

            case 29:
              _context.t6 = _context.sent;
              _context.t7 = {
                posts: _context.t4,
                cates: _context.t5,
                comments: _context.t6
              };
              _context.t8 = {
                versions: _context.t2,
                config: _context.t3,
                count: _context.t7
              };
              return _context.abrupt('return', _context.t1.success.call(_context.t1, _context.t8));

            case 33:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 8]]);
    }));

    function getAction() {
      return _ref.apply(this, arguments);
    }

    return getAction;
  }();

  _class.prototype.getConfig = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var items, siteConfig;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.modelInstance.select();

            case 2:
              items = _context2.sent;
              siteConfig = {};


              items.forEach(function (item) {
                return siteConfig[item.key] = item.value;
              });

              return _context2.abrupt('return', siteConfig);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getConfig() {
      return _ref2.apply(this, arguments);
    }

    return getConfig;
  }();

  return _class;
}(_base3.default);

exports.default = _class;