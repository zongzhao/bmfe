exports.ids = [1];
exports.modules = {

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  var _cmd = 'bmfe sc -t default --color';

  if (options.force) _cmd += ' -f';

  _child_process2.default.execSync(_cmd, { stdio: 'inherit' });
};

var _child_process = __webpack_require__(10);

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }

};;