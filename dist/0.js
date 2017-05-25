exports.ids = [0];
exports.modules = {

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {

  if (!options.force && _fs2.default.readdirSync(process.cwd()).length) {
    console.log(_chalk2.default.yellow('Warning: 此命令将会覆盖某些文件！，请使用 --force(-f) 继续。'));
    console.log(_chalk2.default.red('存在警告，放弃操作。'));
    return;
  }

  var dirname = _path2.default.join(__dirname, '..', 'src', 'template', 'default');

  (0, _regexFiles2.default)(dirname, [], [], function (err, results) {
    if (err) {
      console.log(_chalk2.default.red(err.message));
      return;
    }
    results.forEach(function (repo) {
      var stat = _fs2.default.lstatSync(repo);
      var rdirname = _path2.default.relative(dirname, repo);
      var fall = [];
      if (stat.isDirectory()) {
        fall.push((0, _fs3.pMkdir)(rdirname));
      } else if (!/^\./.test(rdirname)) {
        fall.push((0, _fs3.pWriteFile)(rdirname.replace('_', '.'), repo));
      }
    });
  });
};

var _chalk = __webpack_require__(2);

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = __webpack_require__(0);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

var _regexFiles = __webpack_require__(22);

var _regexFiles2 = _interopRequireDefault(_regexFiles);

var _fs3 = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

(function () {
  var fs = __webpack_require__(0);
  var path = __webpack_require__(1);

  var regInclude = function regInclude(file, rIncludes) {
    if (!rIncludes || rIncludes.length < 1) {
      return true;
    }
    var len = rIncludes.length;
    var i = 0;
    for (; i < len; i++) {
      if (file.match(rIncludes[i])) {
        return true;
      }
    }
    return false;
  };

  var regExclude = function regExclude(dir, rExcludes, rIncludes, done) {
    var inResults = [];

    fs.readdir(dir, function (err, list) {
      if (err) return done(err);

      var pending = list.length;
      if (!pending) return done(null, inResults);

      list.forEach(function (file) {
        file = path.join(dir, file);

        var excluded = false;

        if (rExcludes && rExcludes.length > 0) {
          var len = rExcludes.length;
          var i = 0;
          for (; i < len; i++) {
            if (file.match(rExcludes[i])) {
              excluded = true;
            }
          }
        }

        if (excluded === false) {
          if (regInclude(file, rIncludes)) {
            inResults.push(file);
          }

          fs.stat(file, function (err, stat) {
            if (stat && stat.isDirectory()) {
              regExclude(file, rExcludes, rIncludes, function (err, inres) {
                inResults = inResults.concat(inres);
                if (! --pending) {
                  done(null, inResults);
                }
              });
            } else {
              if (! --pending) {
                done(null, inResults);
              }
            }
          });
        } else {
          if (! --pending) {
            done(null, inResults);
          }
        }
      });
    });
  };

  var regexfiles = function regexfiles(dir, rExcludes, rIncludes, done) {
    regExclude(dir, rExcludes, rIncludes, function (err, files) {
      done(null, files);
      return;
    });
  };
  module.exports = regexfiles;
})();

/***/ }

};;