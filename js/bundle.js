/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _basepath = "";

exports.default = {
  init: function init() {
    _basepath = window.urb.util.basepath("/");
    _basepath += window.location.pathname.replace(window.tree._basepath, "").split("/")[0];
  },


  components: {
    ship: __webpack_require__(6)
  },

  basepath: function basepath(path) {
    var prefix = _basepath;
    if (prefix === "/") {
      prefix = "";
    }
    if (path[0] !== "/") {
      path = "/" + path;
    }
    var _path = prefix + path;
    if (_path.slice(-1) === "/" && _path.length > 1) {
      _path = _path.slice(0, -1);
    }
    return _path;
  },
  fragpath: function fragpath(path) {
    return path.replace(/\/$/, '').replace(_basepath, "");
  },
  shortShip: function shortShip(ship) {
    if (ship == null) {
      ship = urb.user != null ? urb.user : "";
    }
    if (ship.length <= 13) {
      return ship;
    } else if (ship.length === 27) {
      return ship.slice(14, 20) + "^" + ship.slice(-6);
    } else {
      return ship.slice(0, 6) + "_" + ship.slice(-6); // s/(.{6}).*(.{6})/\1_\2/
    }
  },
  dateFromAtom: function dateFromAtom(date) {
    var d = void 0;

    var _date$slice$split = // ~y.m.d..h.m.s
    date.slice(1).split("."),
        _date$slice$split2 = _slicedToArray(_date$slice$split, 7),
        yer = _date$slice$split2[0],
        mon = _date$slice$split2[1],
        day = _date$slice$split2[2],
        __ = _date$slice$split2[3],
        hor = _date$slice$split2[4],
        min = _date$slice$split2[5],
        sec = _date$slice$split2[6];

    if (day != null) {
      d = new Date();
      d.setYear(yer);
      d.setMonth(mon - 1);
      d.setDate(day);
    }
    if (hor != null) {
      d.setHours(hor);
      d.setMinutes(min);
      return d.setSeconds(sec);
    }
  },
  getKeys: function getKeys(kids, sortBy) {
    return _.map(this.sortKids(kids, sortBy), 'name');
  },
  sortKids: function sortKids(kids, sortBy) {
    var _this = this;

    // kids: {name:'t', bump:'t', meta:'j'}
    var v = void 0;
    if (sortBy == null) {
      sortBy = null;
    }
    kids = _.filter(kids, function (_ref) {
      var meta = _ref.meta;
      return !__guard__(meta, function (x) {
        return x.hide;
      });
    });
    var k;

    var _ret = function () {
      switch (sortBy) {
        case 'bump':
          return {
            v: _.sortBy(kids, function (_ref2) {
              var bump = _ref2.bump,
                  meta = _ref2.meta,
                  name = _ref2.name;
              return _this.dateFromAtom(bump || __guard__(meta, function (x) {
                return x.date;
              }) || name);
            }).reverse()
          };
        //
        case 'date':
          var _kids = [];
          for (k in kids) {
            v = kids[k];
            if (__guard__(v.meta, function (x) {
              return x.date;
            }) == null) {
              // XX throw?
              return {
                v: _.sortBy(kids, 'name')
              };
            }
            var date = _this.dateFromAtom(v.meta.date);
            if (date == null) {
              // XX throw
              return {
                v: _.sortBy(kids, 'name')
              };
            }
            var _k = Number(new Date(date));
            _kids[_k] = v;
          }
          return {
            v: function () {
              var result = [];
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = Array.from(_.keys(_kids).sort().reverse())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  k = _step.value;

                  result.push(_kids[k]);
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              return result;
            }()
          };
        //
        case null:
          _kids = [];
          for (k in kids) {
            v = kids[k];
            if (__guard__(v.meta, function (x1) {
              return x1.sort;
            }) == null) {
              // XX throw if inconsistent?
              return {
                v: _.sortBy(kids, 'name')
              };
            }
            _kids[Number(v.meta.sort)] = v;
          }
          return {
            v: function () {
              var result1 = [];
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = Array.from(_.keys(_kids).sort())[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  k = _step2.value;

                  result1.push(_kids[k]);
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }

              return result1;
            }()
          };
        //
        default:
          throw new Error("Unknown sort: " + sortBy);
      }
    }();

    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
  }
};


function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (queries, Child, load) {
  if (load == null) {
    load = _LoadComponent2.default;
  }return recl({
    displayName: "Async",

    getInitialState: function getInitialState() {
      return this.stateFromStore();
    },
    _onChangeStore: function _onChangeStore() {
      if (this.isMounted()) {
        return this.setState(this.stateFromStore());
      }
    },
    getPath: function getPath() {
      var path = this.props.dataPath;
      var base = this.props.basePath != null ? this.props.basePath : _TreeStore2.default.getCurr();
      if (path == null) {
        var left = void 0;
        path = (left = fragsrc(this.props.src, base)) != null ? left : base;
      }
      if (path.slice(-1) === "/") {
        return path.slice(0, -1);
      } else {
        return path;
      }
    },
    stateFromStore: function stateFromStore() {
      var got = void 0;
      var path = this.getPath();
      var fresh = _TreeStore2.default.fulfill(path, queries);
      if (this.state == null || path !== this.state.path) {
        got = fresh;
      } else {
        got = this.mergeWith(this.state.got, fresh);
      }
      return { path: path, fresh: fresh, got: got, queries: queries };
    },
    mergeWith: function mergeWith(have, fresh, _queries) {
      if (have == null) {
        have = {};
      }
      if (fresh == null) {
        fresh = {};
      }
      if (_queries == null) {
        _queries = queries;
      }
      var got = {};
      for (var k in _queries) {
        if (k !== 'kids') {
          got[k] = fresh[k] != null ? fresh[k] : have[k];
        }
      }
      if (_queries.kids != null) {
        if (fresh.kids == null) {
          got.kids = have.kids;
        } else {
          got.kids = {};
          for (k in fresh.kids) {
            var kid = fresh.kids[k];
            got.kids[k] = this.mergeWith(__guard__(have.kids, function (x) {
              return x[k];
            }), kid, _queries.kids);
          }
        }
      }
      return got;
    },
    componentDidMount: function componentDidMount() {
      _TreeStore2.default.addChangeListener(this._onChangeStore);
      return this.checkPath();
    },
    componentWillUnmount: function componentWillUnmount() {
      return _TreeStore2.default.removeChangeListener(this._onChangeStore);
    },
    componentDidUpdate: function componentDidUpdate(_props, _state) {
      if (_props !== this.props) {
        this.setState(this.stateFromStore());
      }
      return this.checkPath();
    },
    checkPath: function checkPath() {
      return _TreeActions2.default.sendQuery(this.getPath(), this.filterFreshQueries());
    },
    filterFreshQueries: function filterFreshQueries() {
      return this.filterWith(this.state.fresh, queries);
    },
    filterQueries: function filterQueries() {
      return this.filterWith(this.state.got, queries);
    },
    filterWith: function filterWith(have, _queries) {
      if (have == null) {
        return _queries;
      }
      var request = {};
      for (var k in _queries) {
        if (k !== 'kids') {
          if (have[k] === undefined) {
            request[k] = _queries[k];
          }
        }
      }
      if (_queries.kids != null) {
        if (have.kids == null) {
          request.kids = _queries.kids;
        } else {
          request.kids = {};
          for (k in have.kids) {
            var kid = have.kids[k];
            _.merge(request.kids, this.filterWith(kid, _queries.kids));
          }
          if (_.isEmpty(request.kids)) {
            delete request.kids;
          }
        }
      }
      if (!_.isEmpty(request)) {
        return request;
      }
    },
    scrollHash: function scrollHash() {
      return __guard__(this.getHashElement(), function (x) {
        return x.scrollIntoView();
      });
    },
    getHashElement: function getHashElement() {
      var hash = document.location.hash;

      if (hash) {
        return document.getElementById(hash.slice(1));
      }
    },
    render: function render() {
      var _this = this;

      return div({}, function () {
        if (_this.filterQueries() != null) {
          return React.createElement(load, _this.props);
        } else {
          if (!_this.getHashElement()) {
            // onmount?
            setTimeout(_this.scrollHash, 0);
          }
          return React.createElement(Child, _.extend({}, _this.props, _this.state.got), _this.props.children);
        }
      }());
    }
  });
};

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _LoadComponent = __webpack_require__(5);

var _LoadComponent2 = _interopRequireDefault(_LoadComponent);

var _TreeStore = __webpack_require__(7);

var _TreeStore2 = _interopRequireDefault(_TreeStore);

var _TreeActions = __webpack_require__(2);

var _TreeActions2 = _interopRequireDefault(_TreeActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recl = React.createClass;
var _React$DOM = React.DOM,
    div = _React$DOM.div,
    span = _React$DOM.span,
    code = _React$DOM.code;


var fragsrc = function fragsrc(src, basePath) {
  if (src != null) {
    basePath = _util2.default.basepath(basePath);
    if (basePath.slice(-1) !== "/") {
      basePath += "/";
    }
    var base = new URL(basePath, document.location);

    var _ref = new URL(src, base),
        pathname = _ref.pathname;

    return _util2.default.fragpath(pathname);
  }
};

;

function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Dispatcher = __webpack_require__(8);

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _TreePersistence = __webpack_require__(29);

var _TreePersistence2 = _interopRequireDefault(_TreePersistence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _initialLoad = true; // XX right place?
var _initialLoadDedup = {};

exports.default = {
  loadPath: function loadPath(path, data) {
    return _Dispatcher2.default.handleServerAction({ path: path, data: data, type: "loadPath" });
  },
  loadSein: function loadSein(path, data) {
    return _Dispatcher2.default.handleServerAction({ path: path, data: data, type: "loadSein" });
  },
  clearData: function clearData() {
    _initialLoad = false;
    _initialLoadDedup = {};
    _TreePersistence2.default.refresh(); // XX right place?
    return _Dispatcher2.default.handleServerAction({ type: "clearData" });
  },
  sendQuery: function sendQuery(path, query) {
    var _this = this;

    if (query == null) {
      return;
    }
    if (_initialLoad) {
      var key = path + JSON.stringify(query);
      if (!_initialLoadDedup[key]) {
        _initialLoadDedup[key] = true;
        console.warn("Requesting data during initial page load", JSON.stringify(path), query);
      }
    }
    if (path.slice(-1) === "/") {
      path = path.slice(0, -1);
    }
    return _TreePersistence2.default.get(path, query, function (err, res) {
      if (err != null) {
        throw err;
      }
      return _this.loadPath(path, res);
    });
  },
  registerComponent: function registerComponent(name, comp) {
    return this.addVirtual(_defineProperty({}, name, comp));
  },
  registerScriptElement: function registerScriptElement(elem) {
    return _TreePersistence2.default.waspElem(elem);
  },
  addVirtual: function addVirtual(components) {
    return _Dispatcher2.default.handleViewAction({ type: "addVirtual", components: components });
  },
  addComment: function addComment(pax, sup, txt) {
    var _this2 = this;

    return _TreePersistence2.default.put({ pax: pax, sup: sup, txt: txt }, "talk-comment", "talk", function (err, res) {
      if (err == null) {
        return _this2.clearData();
      }
    });
  },
  addPost: function addPost(pax, sup, hed, txt) {
    var _this3 = this;

    return _TreePersistence2.default.put({ pax: pax, sup: sup, hed: hed, txt: txt }, "talk-fora-post", "talk", function (err, res) {
      if (err == null) {
        _this3.clearData();
        history.pushState({}, "", "..");
        return _this3.setCurr(pax);
      }
    });
  },
  setPlanInfo: function setPlanInfo(_ref) {
    var who = _ref.who,
        loc = _ref.loc;

    return _TreePersistence2.default.put({ who: who, loc: loc }, "write-plan-info", "hood");
  },
  setCurr: function setCurr(path, init) {
    if (init == null) {
      init = false;
    }
    _initialLoad &= init;
    return _Dispatcher2.default.handleViewAction({
      type: "setCurr",
      path: path
    });
  },
  setNav: function setNav(_ref2) {
    var title = _ref2.title,
        dpad = _ref2.dpad,
        sibs = _ref2.sibs,
        subnav = _ref2.subnav;

    return _Dispatcher2.default.handleViewAction({
      title: title,
      dpad: dpad,
      sibs: sibs,
      subnav: subnav,
      type: "setNav"
    });
  },
  toggleNav: function toggleNav() {
    return _Dispatcher2.default.handleViewAction({ type: "toggleNav" });
  },
  closeNav: function closeNav() {
    return _Dispatcher2.default.handleViewAction({ type: "closeNav" });
  },
  clearNav: function clearNav() {
    return _Dispatcher2.default.handleViewAction({ type: "clearNav" });
  }
};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TreeStore = __webpack_require__(7);

var _TreeStore2 = _interopRequireDefault(_TreeStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recl = React.createClass;
var rele = React.createElement;
var _React$DOM = React.DOM,
    div = _React$DOM.div,
    span = _React$DOM.span;

var load = React.createFactory(__webpack_require__(5));

var name = function name(displayName, component) {
  return _.extend(component, { displayName: displayName });
};

var walk = function walk(root, _nil, _str, _comp) {
  // manx: {fork: ["string", {gn:"string" ga:{dict:"string"} c:{list:"manx"}}]}
  var _walk = function _walk(elem, key) {
    var left = void 0;
    switch (false) {
      case !(elem == null):
        return _nil();
      case typeof elem !== "string":
        return _str(elem);
      case elem.gn == null:
        var gn = elem.gn,
            ga = elem.ga,
            c = elem.c;

        c = (left = __guard__(c, function (x) {
          return x.map(_walk);
        })) != null ? left : [];
        return _comp.call(elem, { gn: gn, ga: ga, c: c }, key);
      default:
        throw 'Bad react-json ' + JSON.stringify(elem);
    }
  };
  return _walk(root);
};

var DynamicVirtual = recl({
  displayName: "DynamicVirtual",
  getInitialState: function getInitialState() {
    return this.stateFromStore();
  },
  stateFromStore: function stateFromStore() {
    return { components: _TreeStore2.default.getVirtualComponents() };
  },
  _onChangeStore: function _onChangeStore() {
    if (this.isMounted()) {
      return this.setState(this.stateFromStore());
    }
  },
  componentDidMount: function componentDidMount() {
    return _TreeStore2.default.addChangeListener(this._onChangeStore);
  },
  componentWillUnmount: function componentWillUnmount() {
    return _TreeStore2.default.removeChangeListener(this._onChangeStore);
  },
  render: function render() {
    return Virtual(_.extend({}, this.props, { components: this.state.components }));
  }
});

var Virtual = name("Virtual", function (_ref) {
  var manx = _ref.manx,
      components = _ref.components,
      basePath = _ref.basePath;
  return walk(manx, function () {
    return load({}, "");
  }, function (str) {
    return str;
  }, function (_ref2, key) {
    var gn = _ref2.gn,
        ga = _ref2.ga,
        c = _ref2.c;

    var props = { key: key };
    if (__guard__(ga, function (x) {
      return x.style;
    })) {
      try {
        ga.style = eval('(' + ga.style + ')');
      } catch (e) {
        ga.style = ga.style;
      }
    }
    if (components[gn]) {
      props.basePath = basePath;
    }
    return rele(components[gn] != null ? components[gn] : gn, _.extend(props, ga), c.length ? c : undefined);
  });
});

var reactify = function reactify(manx, key, param) {
  if (param == null) {
    param = {};
  }
  var _param = param,
      basePath = _param.basePath,
      components = _param.components;

  if (components != null) {
    return rele(Virtual, { manx: manx, key: key, basePath: basePath, components: components });
  } else {
    return rele(DynamicVirtual, { manx: manx, key: key, basePath: basePath });
  }
};
exports.default = _.extend(reactify, { walk: walk, Virtual: Virtual });


function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var recl = React.createClass;
var _React$DOM = React.DOM,
    span = _React$DOM.span,
    div = _React$DOM.div;
exports.default = recl({
  displayName: "Load",
  getInitialState: function getInitialState() {
    return { anim: 0 };
  },
  componentDidMount: function componentDidMount() {
    return this.interval = setInterval(this.setAnim, 100);
  },
  componentWillUnmount: function componentWillUnmount() {
    return clearInterval(this.interval);
  },
  setAnim: function setAnim() {
    var anim = this.state.anim + 1;
    if (anim > 3) {
      anim = 0;
    }
    return this.setState({ anim: anim });
  },
  render: function render() {
    return span({ className: "loading state-" + this.state.anim }, '');
  }
});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var recl = React.createClass;
var div = React.DOM.div;
exports.default = recl({
  render: function render() {
    var attr = {
      "data-alias": "~" + window.tree.util.shortShip(this.props.ship),
      className: 'ship'
    };
    return div(attr, "~", this.props.ship);
  }
});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Dispatcher = __webpack_require__(8);

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventEmitter = __webpack_require__(30).EventEmitter.EventEmitter;

var clog = console.log.bind(console);

var _virt = {};
var _tree = {};
var _data = {};
var _curr = "";
var _nav = {};

var QUERIES = {
  body: 'r',
  head: 'r',
  snip: 'r',
  sect: 'j',
  meta: 'j',
  comt: 'j',
  plan: 'j',
  beak: 't',
  spur: 't',
  bump: 't'
};

var TreeStore = _.extend(new EventEmitter().setMaxListeners(50), {
  addChangeListener: function addChangeListener(cb) {
    return this.on('change', cb);
  },
  removeChangeListener: function removeChangeListener(cb) {
    return this.removeListener("change", cb);
  },
  emitChange: function emitChange() {
    return this.emit('change');
  },
  pathToArr: function pathToArr(_path) {
    return _path.split("/");
  },
  fulfill: function fulfill(path, query) {
    if (path === "/") {
      path = "";
    }
    return this.fulfillAt(this.getTree(path.split('/')), path, query);
  },
  fulfillAt: function fulfillAt(tree, path, query) {
    var k = void 0;
    var data = this.fulfillLocal(path, query);
    var have = _data[path];
    if (have != null) {
      for (k in query) {
        var t = query[k];
        if (QUERIES[k]) {
          if (t !== QUERIES[k]) {
            throw TypeError('Wrong query type: ' + k + ', \'' + t + '\'');
          }
          data[k] = have[k];
        }
      }
    }

    if (query.kids) {
      if (__guard__(have, function (x) {
        return x.kids;
      }) === false) {
        data.kids = {};
      } else {
        for (k in tree) {
          var sub = tree[k];
          if (data.kids == null) {
            data.kids = {};
          }
          data.kids[k] = this.fulfillAt(sub, path + "/" + k, query.kids);
        }
      }
    }
    if (!_.isEmpty(data)) {
      return data;
    }
  },
  fulfillLocal: function fulfillLocal(path, query) {
    var data = {};
    if (query.path) {
      data.path = path;
    }
    if (query.name) {
      data.name = path.split("/").pop();
    }
    if (query.sein) {
      data.sein = this.getPare(path);
    }
    if (query.next) {
      data.next = this.getNext(path);
    }
    if (query.prev) {
      data.prev = this.getPrev(path);
    }
    return data;
  },
  setCurr: function setCurr(_ref) {
    var path = _ref.path;
    return _curr = path;
  },
  getCurr: function getCurr() {
    return _curr;
  },
  addVirtual: function addVirtual(_ref2) {
    var components = _ref2.components;
    return _.extend(_virt, components);
  },
  getVirtualComponents: function getVirtualComponents() {
    return _virt;
  },
  clearData: function clearData() {
    _data = {};return _tree = {};
  },
  loadSein: function loadSein(_ref3) {
    var path = _ref3.path,
        data = _ref3.data;

    var sein = this.getPare(path);
    if (sein != null) {
      return this.loadPath({ path: sein, data: data });
    }
  },
  loadPath: function loadPath(_ref4) {
    var path = _ref4.path,
        data = _ref4.data;

    return this.loadValues(this.getTree(path.split('/'), true), path, data);
  },
  loadValues: function loadValues(tree, path, data) {
    var old = _data[path] != null ? _data[path] : {};
    for (var k in data) {
      if (QUERIES[k]) {
        old[k] = data[k];
      }
    }

    for (k in data.kids) {
      var v = data.kids[k];
      if (tree[k] == null) {
        tree[k] = {};
      }
      var _path = path;
      if (_path === "/") {
        _path = "";
      }
      this.loadValues(tree[k], _path + "/" + k, v);
    }

    if (data.kids && _.isEmpty(data.kids)) {
      old.kids = false;
    }

    return _data[path] = old;
  },
  getSiblings: function getSiblings(path) {
    if (path == null) {
      path = _curr;
    }
    var curr = path.split("/");
    curr.pop();
    if (curr.length !== 0) {
      return this.getTree(curr);
    } else {
      return {};
    }
  },
  getTree: function getTree(_path, make) {
    if (make == null) {
      make = false;
    }
    var tree = _tree;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Array.from(_path)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var sub = _step.value;

        if (!sub) {
          continue;
        } // discard empty path elements
        if (tree[sub] == null) {
          if (!make) {
            return null;
          }
          tree[sub] = {};
        }
        tree = tree[sub];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return tree;
  },
  getPrev: function getPrev(path) {
    if (path == null) {
      path = _curr;
    }
    var sibs = _.keys(this.getSiblings(path)).sort();
    if (sibs.length < 2) {
      return null;
    } else {
      var par = path.split("/");
      var key = par.pop();
      var ind = sibs.indexOf(key);
      var win = ind - 1 >= 0 ? sibs[ind - 1] : sibs[sibs.length - 1];
      par.push(win);
      return par.join("/");
    }
  },
  getNext: function getNext(path) {
    if (path == null) {
      path = _curr;
    }
    var sibs = _.keys(this.getSiblings(path)).sort();
    if (sibs.length < 2) {
      return null;
    } else {
      var par = path.split("/");
      var key = par.pop();
      var ind = sibs.indexOf(key);
      var win = ind + 1 < sibs.length ? sibs[ind + 1] : sibs[0];
      par.push(win);
      return par.join("/");
    }
  },
  getPare: function getPare(path) {
    if (path == null) {
      path = _curr;
    }
    var _path = this.pathToArr(path);
    if (_path.length > 1) {
      _path.pop();
      _path = _path.join("/");
      if (_path === "") {
        _path = "/";
      }
      return _path;
    } else {
      return null;
    }
  },
  setNav: function setNav(_ref5) {
    var title = _ref5.title,
        dpad = _ref5.dpad,
        sibs = _ref5.sibs,
        subnav = _ref5.subnav;

    var nav = {
      title: title,
      dpad: dpad,
      sibs: sibs,
      subnav: subnav,
      open: _nav.open ? _nav.open : false
    };
    return _nav = nav;
  },
  getNav: function getNav() {
    return _nav;
  },
  toggleNav: function toggleNav() {
    return _nav.open = !_nav.open;
  },
  closeNav: function closeNav() {
    return _nav.open = false;
  },
  clearNav: function clearNav() {
    return _nav = {
      title: null,
      dpad: null,
      sibs: null,
      subnav: null,
      open: false
    };
  }
});

TreeStore.dispatchToken = _Dispatcher2.default.register(function (p) {
  var a = p.action;

  if (TreeStore[a.type]) {
    TreeStore[a.type](a);
    return TreeStore.emitChange();
  }
});

exports.default = TreeStore;


function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _.extend(new Flux.Dispatcher(), {
  handleServerAction: function handleServerAction(action) {
    return this.dispatch({
      source: 'server',
      action: action
    });
  },
  handleViewAction: function handleViewAction(action) {
    return this.dispatch({
      source: 'view',
      action: action
    });
  }
});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CodeMirror = __webpack_require__(13);

var _CodeMirror2 = _interopRequireDefault(_CodeMirror);

var _SearchComponent = __webpack_require__(26);

var _SearchComponent2 = _interopRequireDefault(_SearchComponent);

var _ListComponent = __webpack_require__(19);

var _ListComponent2 = _interopRequireDefault(_ListComponent);

var _KidsComponent = __webpack_require__(18);

var _KidsComponent2 = _interopRequireDefault(_KidsComponent);

var _TocComponent = __webpack_require__(28);

var _TocComponent2 = _interopRequireDefault(_TocComponent);

var _EmailComponent = __webpack_require__(16);

var _EmailComponent2 = _interopRequireDefault(_EmailComponent);

var _ModuleComponent = __webpack_require__(20);

var _ModuleComponent2 = _interopRequireDefault(_ModuleComponent);

var _ScriptComponent = __webpack_require__(25);

var _ScriptComponent2 = _interopRequireDefault(_ScriptComponent);

var _PlanComponent = __webpack_require__(23);

var _PlanComponent2 = _interopRequireDefault(_PlanComponent);

var _PanelComponent = __webpack_require__(22);

var _PanelComponent2 = _interopRequireDefault(_PanelComponent);

var _PostComponent = __webpack_require__(24);

var _PostComponent2 = _interopRequireDefault(_PostComponent);

var _ImagepanelComponent = __webpack_require__(17);

var _ImagepanelComponent2 = _interopRequireDefault(_ImagepanelComponent);

var _LoadComponent = __webpack_require__(5);

var _LoadComponent2 = _interopRequireDefault(_LoadComponent);

var _ShipComponent = __webpack_require__(6);

var _ShipComponent2 = _interopRequireDefault(_ShipComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recl = React.createClass;
var div = React.DOM.div;
exports.default = {
  codemirror: _CodeMirror2.default,
  search: _SearchComponent2.default,
  list: _ListComponent2.default,
  kids: _KidsComponent2.default,
  toc: _TocComponent2.default,
  email: _EmailComponent2.default,
  module: _ModuleComponent2.default,
  script: _ScriptComponent2.default,
  plan: _PlanComponent2.default,
  panel: _PanelComponent2.default,
  post: _PostComponent2.default,
  imagepanel: _ImagepanelComponent2.default,
  load: _LoadComponent2.default,
  ship: _ShipComponent2.default,
  lost: recl({
    render: function render() {
      return div({}, "<lost(", this.props.children, ")>");
    }
  })
};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = __webpack_require__(4);

var _classnames2 = _interopRequireDefault(_classnames);

var _Async = __webpack_require__(1);

var _Async2 = _interopRequireDefault(_Async);

var _NavComponent = __webpack_require__(21);

var _NavComponent2 = _interopRequireDefault(_NavComponent);

var _BodyComponent = __webpack_require__(12);

var _BodyComponent2 = _interopRequireDefault(_BodyComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var head = React.createFactory(_NavComponent2.default);

// top level tree component should get rendered to document.body
// and only render two components, head and nav
// each one can determine whether or not it's a container.

var body = React.createFactory(_BodyComponent2.default);

var div = React.DOM.div;
exports.default = (0, _Async2.default)({
  body: 'r',
  name: 't',
  path: 't',
  meta: 'j',
  sein: 't'
}, React.createClass({
  displayName: "Tree",

  render: function render() {
    var treeClas = (0, _classnames2.default)({
      container: this.props.meta.container !== 'false' });

    return div({ className: treeClas }, [head({ key: 'head-container' }, ""), body({ key: 'body-container' }, "")]);
  }
}));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TreeActions = __webpack_require__(2);

var _TreeActions2 = _interopRequireDefault(_TreeActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  w: null, // width
  $d: null, // container
  $n: null, // nav
  nh: null, // nav height cached
  cs: null, // current scroll
  ls: null, // last scroll
  cwh: null, // current window height
  lwh: null, // last window height

  track: function track() {
    this.w = $(window).width();
    this.$n = $('#head');
    this.$d = $('#head .ctrl');
    this.nh = $('#head .ctrl').outerHeight(true);
  },
  clearNav: function clearNav() {
    return this.$n.removeClass('m-up m-down m-fixed');
  },
  resize: function resize() {
    if (this.w > 1170) {
      this.clearNav();
    }
  },
  scroll: function scroll() {
    if (this.$n == null || this.$d == null) {
      return;
    }
    this.cs = $(window).scrollTop();
    this.cwh = window.innerHeight;

    if (this.w > 767) {
      this.clearNav();
    }
    if (this.w < 767) {
      var ct = void 0;
      var top = void 0;
      var dy = this.ls - this.cs;

      this.$d.removeClass('focus');

      if (this.cs <= 0) {
        this.$n.removeClass('m-up');
        this.$n.addClass('m-down m-fixed');
        return;
      }

      // scrolling up
      if (dy > 0) {
        if (!this.$n.hasClass('m-down')) {
          this.$n.removeClass('m-up').addClass('m-down');
          ct = this.$n.offset().top;
          top = this.cs - this.nh;
          if (this.cs > ct && this.cs < ct + this.nh) {
            top = ct;
          }
          // if top < 0 then top = 0
          this.$n.offset({ top: top });
        }
        // set fixed when at top
        if (this.$n.hasClass('m-down') && !this.$n.hasClass('m-fixed') && this.$n.offset().top >= this.cs) {
          this.$n.addClass('m-fixed');
          this.$n.attr({ style: '' });
        }
      }

      // scrolling down
      if (dy < 0) {
        if (this.cwh === this.lwh) {
          if (!this.$n.hasClass('m-up')) {
            this.$n.removeClass('m-down m-fixed').addClass('m-up');
            _TreeActions2.default.closeNav();
            $('.menu.open').removeClass('open');
            top = this.cs < 0 ? 0 : this.cs;
            ct = this.$n.offset().top;
            if (top > ct && top < ct + this.nh) {
              top = ct;
            }
            this.$n.offset({ top: top });
          }
          // close when gone if open
          if (this.$n.hasClass('m-up') && this.$d.hasClass('open')) {
            if (this.cs > this.$n.offset().top + this.$n.height()) {
              _TreeActions2.default.closeNav();
            }
          }
        }
      }
    }

    this.ls = this.cs;
    this.lwh = this.cwh;
  },
  init: function init() {
    setInterval(this.track.bind(this), 200);

    this.ls = $(window).scrollTop();
    this.cs = $(window).scrollTop();

    $(window).on('resize', this.resize.bind(this));
    return $(window).on('scroll', this.scroll.bind(this));
  }
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = __webpack_require__(4);

var _classnames2 = _interopRequireDefault(_classnames);

var _LoadComponent = __webpack_require__(5);

var _LoadComponent2 = _interopRequireDefault(_LoadComponent);

var _Async = __webpack_require__(1);

var _Async2 = _interopRequireDefault(_Async);

var _Reactify = __webpack_require__(3);

var _Reactify2 = _interopRequireDefault(_Reactify);

var _TreeActions = __webpack_require__(2);

var _TreeActions2 = _interopRequireDefault(_TreeActions);

var _TreeStore = __webpack_require__(7);

var _TreeStore2 = _interopRequireDefault(_TreeStore);

var _CommentsComponent = __webpack_require__(14);

var _CommentsComponent2 = _interopRequireDefault(_CommentsComponent);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = function name(displayName, component) {
  return _.extend(component, { displayName: displayName });
};
// Plan        = require './PlanComponent.js'

var recl = React.createClass;
var rele = React.createElement;
var _React$DOM = React.DOM,
    div = _React$DOM.div,
    h1 = _React$DOM.h1,
    h3 = _React$DOM.h3,
    p = _React$DOM.p,
    img = _React$DOM.img,
    a = _React$DOM.a,
    input = _React$DOM.input;

// named = (x,f)->  f.displayName = x; f

var extras = {
  spam: name("Spam", function () {
    if (document.location.hostname !== 'urbit.org') {
      return div({});
    }
    return div({ className: 'spam' }, a({ href: "http://urbit.org#sign-up" }, "Sign up"), " for our newsletter.");
  }),

  logo: name("Logo", function (_ref) {
    var color = _ref.color;

    var src = void 0;
    if (color === "white" || color === "black") {
      // else?
      src = '//media.urbit.org/logo/logo-' + color + '-100x100.png';
    }
    return a({ href: "http://urbit.org", style: { border: "none" } }, img({ src: src, className: "logo first" }));
  }),

  date: name("Date", function (_ref2) {
    var date = _ref2.date;
    return div({ className: 'date' }, date);
  }),

  title: name("Title", function (_ref3) {
    var title = _ref3.title;
    return h1({ className: 'title' }, title);
  }),
  image: name("Image", function (_ref4) {
    var image = _ref4.image;
    return img({ src: image });
  }),
  preview: name("Preview", function (_ref5) {
    var preview = _ref5.preview;
    return p({ className: 'preview' }, preview);
  }),
  author: name("Author", function (_ref6) {
    var author = _ref6.author;
    return h3({ className: 'author' }, author);
  }),

  // plan: Plan


  next: (0, _Async2.default)({
    path: 't',
    kids: {
      name: 't',
      head: 'r',
      meta: 'j',
      bump: 't'
    }
  }, name("Next", function (_ref7) {
    var curr = _ref7.curr,
        meta = _ref7.meta,
        path = _ref7.path,
        kids = _ref7.kids;

    if (__guard__(__guard__(kids[curr], function (x1) {
      return x1.meta;
    }), function (x) {
      return x.next;
    })) {
      var keys = _util2.default.getKeys(kids, meta.navsort);
      if (keys.length > 1) {
        var index = keys.indexOf(curr);
        var next = index + 1;
        if (next === keys.length) {
          next = 0;
        }
        next = keys[next];
        next = kids[next];

        if (next) {
          return div({ className: "link-next" }, a({ href: path + '/' + next.name }, 'Next: ' + next.meta.title));
        }
      }
    }
    return div({}, "");
  })),

  comments: _CommentsComponent2.default,

  footer: name("Footer", function (_ref8) {
    var container = _ref8.container;

    var containerClas = (0, _classnames2.default)({
      footer: true,
      container: container === 'false'
    });
    var footerClas = (0, _classnames2.default)({
      'col-md-12': container === 'false' });
    return div({ className: containerClas, key: 'footer-container' }, [div({ className: footerClas, key: 'footer-inner' }, ["This page was made by Urbit. Feedback: ", a({ href: "mailto:urbit@urbit.org" }, "urbit@urbit.org"), " ", a({ href: "https://twitter.com/urbit_" }, "@urbit_")])]);
  })
};

exports.default = (0, _Async2.default)({
  body: 'r',
  name: 't',
  path: 't',
  meta: 'j',
  sein: 't'
}, recl({
  displayName: "Body",
  stateFromStore: function stateFromStore() {
    return { curr: _TreeStore2.default.getCurr() };
  },
  getInitialState: function getInitialState() {
    return this.stateFromStore();
  },
  _onChangeStore: function _onChangeStore() {
    if (this.isMounted()) {
      return this.setState(this.stateFromStore());
    }
  },
  componentDidMount: function componentDidMount() {
    return _TreeStore2.default.addChangeListener(this._onChangeStore);
  },
  render: function render() {
    var _this = this;

    var extra = function extra(name, props) {
      if (props == null) {
        props = {};
      }
      if (_this.props.meta[name] != null) {
        if (_.keys(props).length === 0) {
          props[name] = _this.props.meta[name];
        }
        props.key = name;
        return React.createElement(extras[name], props);
      }
    };

    var innerClas = { body: true };
    if (this.props.meta.anchor !== 'none' && this.props.meta.navmode !== 'navbar') {
      innerClas['col-md-9'] = true;
      innerClas['col-md-offset-3'] = true;
    }
    if (this.props.meta.navmode === 'navbar' && this.props.meta.container !== 'false') {
      innerClas['col-md-9'] = true;
      innerClas['col-md-offset-1'] = true;
    }
    innerClas = (0, _classnames2.default)(innerClas);

    var bodyClas = (0, _classnames2.default)(__guard__(this.props.meta.layout, function (x) {
      return x.split(',');
    }));
    if (this.props.meta.type && bodyClas.indexOf(this.props.meta.type) === -1) {
      bodyClas += ' ' + this.props.meta.type;
    }

    var parts = [extra('spam'), extra('logo', { color: this.props.meta.logo }),
    // extra 'plan'
    (0, _Reactify2.default)(this.props.body, 'body'), extra('next', { dataPath: this.props.sein, curr: this.props.name, meta: this.props.meta }), extra('comments'), extra('footer', { container: this.props.meta.container })];

    if (this.props.meta.type === "post") {
      parts.splice(1, 0, extra('date'), extra('title'), extra('image'), extra('preview'), extra('author'));
    }

    return div({ dataPath: this.state.curr, key: this.state.curr }, [div({ className: innerClas, 'data-path': this.props.path, key: 'body-inner' }, [div({
      key: 'body' + this.props.path,
      id: 'body',
      className: bodyClas
    }, parts)])]);
  }
}), recl({
  render: function render() {
    return div({ id: 'body', className: "col-md-offset-3 col-md-9" }, rele(_LoadComponent2.default));
  }
}));


function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var recl = React.createClass;
var _React$DOM = React.DOM,
    div = _React$DOM.div,
    textarea = _React$DOM.textarea;
exports.default = recl({
  render: function render() {
    return div({}, textarea({ ref: 'ed', value: this.props.value }));
  },
  componentDidMount: function componentDidMount() {
    return CodeMirror.fromTextArea(ReactDOM.findDOMNode(this.refs.ed), {
      readOnly: true,
      lineNumbers: true
    });
  }
});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = __webpack_require__(4);

var _classnames2 = _interopRequireDefault(_classnames);

var _LoadComponent = __webpack_require__(5);

var _LoadComponent2 = _interopRequireDefault(_LoadComponent);

var _Async = __webpack_require__(1);

var _Async2 = _interopRequireDefault(_Async);

var _Reactify = __webpack_require__(3);

var _Reactify2 = _interopRequireDefault(_Reactify);

var _TreeActions = __webpack_require__(2);

var _TreeActions2 = _interopRequireDefault(_TreeActions);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _ShipComponent = __webpack_require__(6);

var _ShipComponent2 = _interopRequireDefault(_ShipComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recl = React.createClass;
var rele = React.createElement;
var _React$DOM = React.DOM,
    div = _React$DOM.div,
    p = _React$DOM.p,
    h2 = _React$DOM.h2,
    img = _React$DOM.img,
    a = _React$DOM.a,
    form = _React$DOM.form,
    textarea = _React$DOM.textarea,
    input = _React$DOM.input,
    code = _React$DOM.code;


var DEFER_USER = true;

var Comment = function Comment(_ref) {
  var time = _ref.time,
      user = _ref.user,
      body = _ref.body,
      _ref$loading = _ref.loading,
      loading = _ref$loading === undefined ? false : _ref$loading;
  return div({ className: (0, _classnames2.default)("comment", { loading: loading }) }, '' + window.urb.util.toDate(new Date(time)), h2({}, rele(_ShipComponent2.default, { ship: user })), (0, _Reactify2.default)(body, "comt", { components: {} }));
};

exports.default = (0, _Async2.default)({ comt: 'j', path: 't', spur: 't', meta: 'j' }, recl({
  displayName: "Comments",
  getInitialState: function getInitialState() {
    return {
      loading: null,
      value: "",
      user: urb.user != null ? urb.user : ""
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    if (!DEFER_USER) {
      return urb.init(function () {
        return _this.setState({ user: urb.user });
      });
    }
  },
  componentDidUpdate: function componentDidUpdate(_props) {
    if (urb.user && !this.state.user) {
      this.setState({ user: urb.user != null ? urb.user : "" });
    }
    if (this.props.comt.length > _props.comt.length) {
      return this.setState({ loading: null });
    }
  },
  onSubmit: function onSubmit(e) {
    var value = this.refs.in.comment.value;

    _TreeActions2.default.addComment(this.props.path, this.props.spur, value);
    this.setState({
      value: "",
      loading: { 'loading': 'loading', body: { gn: 'p', c: [value] }, time: Date.now() } });
    return e.preventDefault();
  },
  onChange: function onChange(e) {
    return this.setState({ value: e.target.value });
  },
  render: function render() {
    var left = void 0;
    var _attr = {};
    if (this.state.loading === true) {
      _attr.disabled = "true";
    }
    var textareaAttr = _.create(_attr, {
      type: "text",
      name: "comment",
      value: this.state.value,
      onChange: this.onChange
    });
    var inputAttr = _.create(_attr, {
      type: "submit",
      value: "Add comment",
      className: "btn btn-primary"
    });

    var addComment = div({ key: 'add-comment', className: "add-comment" }, form({ ref: "in", onSubmit: this.onSubmit }, rele(_ShipComponent2.default, { ship: this.state.user }), textarea(textareaAttr), input(inputAttr)));

    var comments = this.props.comt.map(function (props, key) {
      return rele(Comment, _.extend({ key: key }, props));
    });

    comments.unshift(this.state.loading != null ? rele(Comment, _.extend({ key: 'loading' }, this.state.loading, { user: this.state.user })) : undefined);

    if (Array.from((left = __guard__(this.props.meta.comments, function (x) {
      return x.split(" ");
    })) != null ? left : []).includes("reverse")) {
      comments = comments.reverse();
      return div({}, [div({ key: 'comments', className: "comments" }, comments), addComment]);
    } else {
      return div({}, [addComment, div({ key: 'comments', className: "comments" }, comments)]);
    }
  }
}));


function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dpad = void 0;


var recl = React.createClass;
var _React$DOM = React.DOM,
    div = _React$DOM.div,
    a = _React$DOM.a;


var Arrow = function Arrow(name, path) {
  var href = _util2.default.basepath(path);
  return a({ href: href, key: "" + name, className: "" + name }, "");
};

exports.default = Dpad = function Dpad(_ref) {
  var sein = _ref.sein,
      curr = _ref.curr,
      kids = _ref.kids,
      meta = _ref.meta;

  var keys = void 0,
      next = void 0,
      prev = void 0;
  var arrowUp = sein ? meta.navuptwo ? Arrow("up", sein.replace(/\/[^\/]*$/, "")) // strip last path element
  : Arrow("up", sein) : undefined;

  var arrowSibs = (keys = _util2.default.getKeys(kids, meta.navsort), function () {
    if (keys.length > 1) {
      var index = keys.indexOf(curr);
      prev = index - 1;
      next = index + 1;
      if (prev < 0) {
        prev = keys.length - 1;
      }
      if (next === keys.length) {
        next = 0;
      }
      prev = keys[prev];
      return next = keys[next];
    }
  }(), function () {
    if (sein) {
      var _arrow = void 0;
      if (sein === "/") {
        sein = "";
      }
      if (prev) {
        _arrow = Arrow("prev", sein + "/" + prev);
      }
      if (next) {
        _arrow = Arrow("next", sein + "/" + next);
      }
      return div({}, _arrow);
    }
  }());

  return div({ className: 'dpad', key: 'dpad' }, arrowUp, arrowSibs);
};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var recl = React.createClass;
var _React$DOM = React.DOM,
    div = _React$DOM.div,
    p = _React$DOM.p,
    button = _React$DOM.button,
    input = _React$DOM.input;
exports.default = recl({
  displayName: "email",

  getInitialState: function getInitialState() {
    return { submit: false, email: "" };
  },
  onClick: function onClick() {
    return this.submit();
  },
  onChange: function onChange(e) {
    var email = e.target.value;
    this.setState({ email: e.target.value });
    var valid = email.indexOf('@') !== -1 && email.indexOf('.') !== -1 && email.length > 7 && email.split(".")[1].length > 1 && email.split("@")[0].length > 0 && email.split("@")[1].length > 4;
    this.$email.toggleClass('valid', valid);
    this.$email.removeClass('error');
    if (e.keyCode === 13) {
      if (valid === true) {
        this.submit();
        e.stopPropagation();
        e.preventDefault();
        return false;
      } else {
        return this.$email.addClass('error');
      }
    }
  },
  submit: function submit() {
    var _this = this;

    return $.post(this.props.dataPath, { email: this.$email.val() }, function () {
      return _this.setState({ submit: true });
    });
  },
  componentDidMount: function componentDidMount() {
    return this.$email = $('input.email');
  },
  render: function render() {
    var cont = void 0;
    if (this.state.submit === false) {
      var submit = this.props.submit != null ? this.props.submit : "Sign up";
      cont = [input({ key: "field", className: "email", placeholder: "your@email.com", onChange: this.onChange, value: this.state.email }), button({ key: "submit", className: "submit btn", onClick: this.onClick }, submit)];
    } else {
      cont = [div({ className: "submitted" }, "Got it. Thanks!")];
    }
    return p({ className: "email", id: "sign-up" }, cont);
  }
});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var recl = React.createClass;
var name = function name(displayName, component) {
  return _.extend(component, { displayName: displayName });
};
var div = React.DOM.div;
exports.default = name("ImagePanel", function (_ref) {
  var src = _ref.src;
  return div({
    className: "image-container",
    style: { backgroundImage: "url('" + src + "')" }
  });
});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = __webpack_require__(4);

var _classnames2 = _interopRequireDefault(_classnames);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _Reactify = __webpack_require__(3);

var _Reactify2 = _interopRequireDefault(_Reactify);

var _Async = __webpack_require__(1);

var _Async2 = _interopRequireDefault(_Async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recl = React.createClass;
var _React$DOM = React.DOM,
    div = _React$DOM.div,
    a = _React$DOM.a,
    ul = _React$DOM.ul,
    li = _React$DOM.li,
    hr = _React$DOM.hr;
exports.default = (0, _Async2.default)({ kids: { name: 't', bump: 't', body: 'r', meta: 'j', path: 't' } }, recl({
  displayName: "Kids",
  render: function render() {
    var kids = _util2.default.sortKids(this.props.kids, this.props.sortBy);

    var kidsClas = (0, _classnames2.default)({ kids: true }, this.props.className);

    var kidClas = (0, _classnames2.default)({
      "col-md-4": this.props.grid === 'true' });

    var _kids = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Array.from(kids)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var elem = _step.value;

        var body = (0, _Reactify2.default)(elem.body, null, { basePath: elem.path });
        _kids.push([div({ key: elem.name, id: elem.name, className: kidClas }, body), hr({})]);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return div({ className: kidsClas, key: "kids" }, _kids);
  }
}));

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = __webpack_require__(4);

var _classnames2 = _interopRequireDefault(_classnames);

var _Reactify = __webpack_require__(3);

var _Reactify2 = _interopRequireDefault(_Reactify);

var _Async = __webpack_require__(1);

var _Async2 = _interopRequireDefault(_Async);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var recl = React.createClass;
var _React$DOM = React.DOM,
    div = _React$DOM.div,
    pre = _React$DOM.pre,
    span = _React$DOM.span,
    a = _React$DOM.a,
    ul = _React$DOM.ul,
    li = _React$DOM.li,
    h1 = _React$DOM.h1;
exports.default = (0, _Async2.default)({
  path: 't',
  kids: {
    snip: 'r',
    head: 'r',
    meta: 'j',
    bump: 't',
    name: 't'
  }
}, recl({
  displayName: "List",

  render: function render() {
    var k = (0, _classnames2.default)({ list: true }, this.props.dataType, { default: this.props['data-source'] === 'default' }, this.props.className);
    var kids = this.renderList(_util2.default.sortKids(this.props.kids, this.props.sortBy));
    if (kids.length !== 0 || this.props.is404 == null) {
      return ul({ className: k }, kids);
    }

    return div({ className: k }, h1({ className: 'red inverse block error' }, 'Error: Empty path'), div({}, pre({}, this.props.path), span({}, 'is either empty or does not exist.')));
  },
  renderList: function renderList(elems) {
    var _this = this;

    return function () {
      var result = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Array.from(elems)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var elem = _step.value;

          var linked, preview;
          var item = elem.name;
          var meta = elem.meta != null ? elem.meta : {};
          var path = _this.props.path + "/" + item;
          if (meta.hide != null) {
            continue;
          }
          var href = _util2.default.basepath(path);
          if (_this.props.linkToFragments != null) {
            href = '#' + item;
          }
          if (_this.props.childIsFragment != null) {
            href = _util2.default.basepath(_this.props.path) + "#" + item;
          }
          if (meta.link) {
            href = meta.link;
          }
          var parts = [];
          var title = null;

          if (meta.title) {
            if (_this.props.dataType === 'post') {
              title = {
                gn: 'a',
                ga: { href: href },
                c: [{
                  gn: 'h1',
                  ga: { className: 'title' },
                  c: [meta.title]
                }]
              };
            } else {
              title = {
                gn: 'h1',
                ga: { className: 'title' },
                c: [meta.title]
              };
            }
          }
          if (!title && elem.head.c.length > 0) {
            title = elem.head;
          }
          if (!title) {
            title = {
              gn: 'h1',
              ga: { className: 'title' },
              c: [item]
            };
          }

          if (!_this.props.titlesOnly) {
            // date
            var _date = meta.date;
            if (!_date || _date.length === 0) {
              _date = "";
            }
            var date = {
              gn: 'div',
              ga: { className: 'date' },
              c: [_date]
            };
            parts.push(date);
          }

          parts.push(title);

          if (!_this.props.titlesOnly) {
            // metadata
            if (_this.props.dataType === 'post') {
              if (meta.image) {
                // image
                var image = {
                  gn: 'a',
                  ga: { href: href },
                  c: [{
                    gn: 'img',
                    ga: {
                      src: meta.image
                    }
                  }]
                };
                parts.push(image);
              }
            }
            if (_this.props.dataPreview) {
              // preview
              if (!meta.preview) {
                parts.push.apply(parts, _toConsumableArray(elem.snip.c.slice(0, 2)));
              } else {
                if (meta.preview) {
                  preview = {
                    gn: 'p',
                    ga: { className: 'preview' },
                    c: [meta.preview]
                  };
                } else {
                  preview = elem.snip;
                }
                parts.push(preview);
              }
            }
            if (_this.props.dataType === 'post') {
              if (meta.author) {
                // author
                var author = {
                  gn: 'h3',
                  ga: { className: 'author' },
                  c: [meta.author]
                };
                parts.push(author);
              }
              var cont = {
                gn: 'a',
                ga: { className: 'continue', href: href },
                c: ['Read more']
              };
              parts.push(cont);
              linked = true;
            }
          }

          var node = (0, _Reactify2.default)({ gn: 'div', c: parts });
          if (linked == null) {
            node = a({
              href: href,
              className: (0, _classnames2.default)({ preview: _this.props.dataPreview != null })
            }, node);
          }

          result.push(li({ key: item }, node));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return result;
    }();
  }
}));

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TreeActions = __webpack_require__(2);

var _TreeActions2 = _interopRequireDefault(_TreeActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recl = React.createClass;
var div = React.DOM.div;
exports.default = recl({
  displayName: "Module",

  componentDidMount: function componentDidMount() {
    var _this = this;

    return setTimeout(function () {
      return _TreeActions2.default.setNav({
        title: _this.props["nav:title"],
        dpad: _this.props["nav:no-dpad"] != null ? false : undefined,
        sibs: _this.props["nav:no-sibs"] != null ? false : undefined,
        subnav: _this.props["nav:subnav"]
      }, 0);
    }); // XX dispatch while dispatching
  },
  componentWillUnmount: function componentWillUnmount() {
    // reset tree store state
    return setTimeout(function () {
      return _TreeActions2.default.clearNav();
    }, 0);
  },
  render: function render() {
    return div({ className: "module" }, this.props.children);
  }
});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = __webpack_require__(4);

var _classnames2 = _interopRequireDefault(_classnames);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _Async = __webpack_require__(1);

var _Async2 = _interopRequireDefault(_Async);

var _Reactify = __webpack_require__(3);

var _Reactify2 = _interopRequireDefault(_Reactify);

var _TreeStore = __webpack_require__(7);

var _TreeStore2 = _interopRequireDefault(_TreeStore);

var _TreeActions = __webpack_require__(2);

var _TreeActions2 = _interopRequireDefault(_TreeActions);

var _SibsComponent = __webpack_require__(27);

var _SibsComponent2 = _interopRequireDefault(_SibsComponent);

var _DpadComponent = __webpack_require__(15);

var _DpadComponent2 = _interopRequireDefault(_DpadComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// unused
// let BodyComponent = React.createFactory(require('./BodyComponent'));

var Sibs = React.createFactory(_SibsComponent2.default);
var Dpad = React.createFactory(_DpadComponent2.default);

var recl = React.createClass;
var rend = ReactDOM.render;
var _React$DOM = React.DOM,
    div = _React$DOM.div,
    a = _React$DOM.a,
    ul = _React$DOM.ul,
    li = _React$DOM.li,
    button = _React$DOM.button;


var Nav = React.createFactory((0, _Async2.default)({
  path: 't',
  kids: {
    name: 't',
    head: 'r',
    meta: 'j'
  }
}, recl({
  displayName: "Links",
  stateFromStore: function stateFromStore() {
    return _TreeStore2.default.getNav();
  },
  getInitialState: function getInitialState() {
    return this.stateFromStore();
  },
  _onChangeStore: function _onChangeStore() {
    if (this.isMounted()) {
      return this.setState(this.stateFromStore());
    }
  },
  componentDidMount: function componentDidMount() {
    return _TreeStore2.default.addChangeListener(this._onChangeStore);
  },
  componentWillUnmount: function componentWillUnmount() {
    return _TreeStore2.default.removeChangeListener(this._onChangeStore);
  },
  onClick: function onClick() {
    return this.toggleFocus();
  },
  onMouseOver: function onMouseOver() {
    return this.toggleFocus(true);
  },
  onMouseOut: function onMouseOut() {
    return this.toggleFocus(false);
  },
  onTouchStart: function onTouchStart() {
    return this.ts = Number(Date.now());
  },
  onTouchEnd: function onTouchEnd() {
    var dt = void 0;
    return dt = this.ts - Number(Date.now());
  },
  _home: function _home() {
    return this.props.goTo(this.props.meta.navhome ? this.props.meta.navhome : "/");
  },
  toggleFocus: function toggleFocus(state) {
    return $(ReactDOM.findDOMNode(this)).toggleClass('focus', state);
  },
  toggleNav: function toggleNav() {
    return _TreeActions2.default.toggleNav();
  },
  closeNav: function closeNav() {
    return _TreeActions2.default.closeNav();
  },
  render: function render() {
    var sub = void 0;
    var attr = {
      onMouseOver: this.onMouseOver,
      onMouseOut: this.onMouseOut,
      onClick: this.onClick,
      onTouchStart: this.onTouchStart,
      onTouchEnd: this.onTouchEnd,
      'data-path': this.props.dataPath
    };

    if (_.keys(window).indexOf("ontouchstart") !== -1) {
      delete attr.onMouseOver;
      delete attr.onMouseOut;
    }

    var linksClas = (0, _classnames2.default)({
      links: true,
      subnav: this.props.meta.navsub != null
    });

    var navClas = {
      navbar: this.props.meta.navmode === 'navbar',
      ctrl: true,
      open: this.state.open === true
    };
    if (this.props.meta.layout) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Array.from(this.props.meta.layout.split(","))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          navClas[v.trim()] = true;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    navClas = (0, _classnames2.default)(navClas);
    var iconClass = (0, _classnames2.default)({
      icon: true,
      'col-md-1': this.props.meta.navmode === 'navbar'
    });

    attr = _.extend(attr, { className: navClas, key: "nav" });

    var title = this.state.title ? this.state.title : "";
    var dpad = this.state.dpad !== false && __guard__(this.props.meta, function (x) {
      return x.navdpad;
    }) !== "false" ? Dpad(this.props, "") : "";
    var sibs = this.state.sibs !== false && __guard__(this.props.meta, function (x1) {
      return x1.navsibs;
    }) !== "false" ? Sibs(_.merge(_.clone(this.props), { closeNav: this.closeNav }), "") : "";

    var itemsClass = (0, _classnames2.default)({
      items: true,
      'col-md-11': this.props.meta.navmode === 'navbar'
    });

    if (this.props.meta.navsub) {
      var subprops = _.cloneDeep(this.props);
      subprops.dataPath = subprops.meta.navsub;
      delete subprops.meta.navselect;
      subprops.className = 'subnav';
      sub = Sibs(_.merge(subprops, { toggleNav: this.toggleNav }), "");
    }

    var toggleClas = (0, _classnames2.default)({
      'navbar-toggler': true,
      show: this.state.subnav != null
    });

    return div(attr, [div({ className: linksClas, key: "links" }, [div({ className: iconClass }, [div({ className: 'home', onClick: this._home }, ""), div({ className: 'app' }, title), dpad, button({
      className: toggleClas,
      type: 'button',
      onClick: this.toggleNav }, "☰")]), div({ className: itemsClass }, [sibs, sub])])]);
  }
}), recl({
  displayName: "Links_loading",
  _home: function _home() {
    return this.props.goTo("/");
  },
  render: function render() {
    return div({
      className: "ctrl loading",
      "data-path": this.props.dataPath,
      key: "nav-loading"
    }, div({ className: 'links' }, div({ className: 'icon' }, div({ className: 'home', onClick: this._home }, "")), ul({ className: "nav" }, li({ className: "nav-item selected" }, a({ className: "nav-link" }, this.props.curr)))));
  }
})));

exports.default = (0, _Async2.default)({
  sein: 't',
  path: 't',
  name: 't',
  meta: 'j'
}, recl({
  displayName: "Nav",
  stateFromStore: function stateFromStore() {
    return _TreeStore2.default.getNav();
  },
  getInitialState: function getInitialState() {
    return _.extend(this.stateFromStore(), { url: window.location.pathname });
  },
  _onChangeStore: function _onChangeStore() {
    if (this.isMounted()) {
      return this.setState(this.stateFromStore());
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    clearInterval(this.interval);
    $('body').off('click', 'a');
    return _TreeStore2.default.removeChangeListener(this._onChangeStore);
  },
  componentDidUpdate: function componentDidUpdate() {
    this.setTitle();
    return this.checkRedirect();
  },
  componentDidMount: function componentDidMount() {
    this.setTitle();

    window.onpopstate = this.pullPath;

    _TreeStore2.default.addChangeListener(this._onChangeStore);

    var _this = this;
    $('body').on('click', 'a', function (e) {
      // allow cmd+click
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        return true;
      }
      var href = $(this).attr('href');
      if (__guard__(href, function (x) {
        return x[0];
      }) === "#") {
        return true;
      }
      if (href && !/^https?:\/\//i.test(href)) {
        var url = new URL(this.href);
        if (!/http/.test(url.protocol)) {
          // mailto: bitcoin: etc.
          return;
        }
        e.preventDefault();
        var basepath = urb.util.basepath;

        if (basepath("", url.pathname) !== basepath("", document.location.pathname)) {
          document.location = this.href;
          return;
        }
        if (url.pathname.substr(-1) !== "/") {
          url.pathname += "/";
        }
        return _this.goTo(url.pathname + url.search + url.hash);
      }
    });
    return this.checkRedirect();
  },
  checkRedirect: function checkRedirect() {
    var _this2 = this;

    if (this.props.meta.redirect) {
      return setTimeout(function () {
        return _this2.goTo(_this2.props.meta.redirect);
      }, 0);
    }
  },
  setTitle: function setTitle() {
    var title = $('#body h1').first().text() || this.props.name;
    if (__guard__(this.props.meta, function (x) {
      return x.title;
    })) {
      title = this.props.meta.title;
    }
    var path = this.props.path;

    if (path === "") {
      path = "/";
    }
    return document.title = title + ' - ' + path;
  },
  pullPath: function pullPath() {
    var l = document.location;
    var path = l.pathname + l.search + l.hash;
    return this.setPath(path, false);
  },
  setPath: function setPath(path, hist) {
    if (hist !== false) {
      history.pushState({}, "", path);
    }
    var next = _util2.default.fragpath(path.split('#')[0]);
    if (next !== this.props.path) {
      return _TreeActions2.default.setCurr(next);
    }
  },
  reset: function reset() {
    return $("html,body").animate({ scrollTop: 0 });
  },

  // $('#nav').attr 'style',''
  // $('#nav').removeClass 'scrolling m-up'
  // $('#nav').addClass 'm-down m-fixed'

  goTo: function goTo(path) {
    this.reset();
    return this.setPath(path);
  },
  render: function render() {
    if (this.props.meta.anchor === 'none') {
      return div({}, "");
    }

    var navClas = (0, _classnames2.default)({
      container: this.props.meta.container === 'false' });

    var kidsPath = this.props.sein;
    if (this.props.meta.navpath) {
      kidsPath = this.props.meta.navpath;
    }

    var kids = [Nav({
      curr: this.props.name,
      dataPath: kidsPath,
      meta: this.props.meta,
      sein: this.props.sein,
      goTo: this.goTo,
      key: "nav"
    }, "div")];

    if (this.state.subnav) {
      kids.push((0, _Reactify2.default)({
        gn: this.state.subnav,
        ga: { open: this.state.open, toggle: _TreeActions2.default.toggleNav },
        c: []
      }, "subnav"));
    }

    return div({ id: 'head', className: navClas }, kids);
  }
}));


function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var recl = React.createClass;
var rele = React.createElement;
var _React$DOM = React.DOM,
    nav = _React$DOM.nav,
    ul = _React$DOM.ul,
    li = _React$DOM.li,
    a = _React$DOM.a;
exports.default = recl({
  getInitialState: function getInitialState() {
    return { loaded: urb.ship != null };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    return urb.init(function () {
      return _this.setState({ 'loaded': 'loaded' });
    });
  },
  render: function render() {
    if (urb.user == null || urb.user !== urb.ship) {
      return nav({ className: "navbar panel" }, [ul({ className: "nav navbar-nav" }, [li({ className: 'nav-item pull-right' }, a({ href: "/~~" }, "Log in"))])]);
    } else {
      return nav({ className: "navbar panel" }, [ul({ className: "nav navbar-nav" }, [li({ className: "nav-item" }, a({ href: "/~~/talk" }, "Talk")), li({ className: "nav-item" }, a({ href: "/~~/dojo" }, "Dojo")), li({ className: "nav-item" }, a({ href: "/~~/static" }, "Static")), li({ className: 'nav-item pull-right' }, a({ href: "/~/away" }, "Log out"))])]);
    }
  }
});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LoadComponent = __webpack_require__(5);

var _LoadComponent2 = _interopRequireDefault(_LoadComponent);

var _Async = __webpack_require__(1);

var _Async2 = _interopRequireDefault(_Async);

var _TreeActions = __webpack_require__(2);

var _TreeActions2 = _interopRequireDefault(_TreeActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var recl = React.createClass;
var rele = React.createElement;
var _React$DOM = React.DOM,
    div = _React$DOM.div,
    textarea = _React$DOM.textarea,
    button = _React$DOM.button,
    input = _React$DOM.input,
    a = _React$DOM.a,
    h6 = _React$DOM.h6,
    code = _React$DOM.code,
    span = _React$DOM.span;
var _React$DOM2 = React.DOM,
    table = _React$DOM2.table,
    tbody = _React$DOM2.tbody,
    tr = _React$DOM2.tr,
    td = _React$DOM2.td; // XX flexbox?

var Grid = function Grid(props) {
  // Grid [[1,2],null,[3,4],[5,6]]
  var _td = function _td(x) {
    return div({ className: "td" }, x);
  };
  var _tr = function _tr(x) {
    if (x != null) {
      return div.apply(undefined, [{ className: "tr" }].concat(_toConsumableArray(x.map(_td))));
    }
  };

  for (var _len = arguments.length, rows = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rows[_key - 1] = arguments[_key];
  }

  return div.apply(undefined, [props].concat(_toConsumableArray(rows.map(_tr))));
};

exports.default = (0, _Async2.default)({
  plan: 'j',
  beak: 't',
  path: 't'
}, recl({
  displayName: "Plan",
  getInitialState: function getInitialState() {
    return {
      edit: false,
      plan: this.props.plan,
      focus: null,
      loaded: urb.ship != null
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    return urb.init(function () {
      return _this.setState({ 'loaded': 'loaded' });
    });
  },
  componentWillReceiveProps: function componentWillReceiveProps(props) {
    if (_.isEqual(this.props.plan, this.state.plan)) {
      return this.setState({ plan: props.plan });
    }
  },
  refInput: function refInput(ref) {
    var _this2 = this;

    return function (node) {
      _this2[ref] = node;
      if (ref === _this2.state.focus) {
        return __guard__(node, function (x) {
          return x.focus();
        });
      }
    };
  },
  saveInfo: function saveInfo() {
    var plan = { who: this.who.value, loc: this.loc.value, acc: __guard__(this.props.plan, function (x) {
        return x.acc;
      }) };
    if (!_.isEqual(plan, this.state.plan)) {
      _TreeActions2.default.setPlanInfo(plan);
      this.setState({ plan: plan });
    }
    return this.setState({ edit: false, focus: null });
  },
  render: function render() {
    var _this3 = this;

    var accounts = void 0,
        editable = void 0,
        editButton = void 0;
    if (!this.state.loaded) {
      return div({ className: "plan" }, "Loading authentication info");
    }
    var _props = this.props,
        beak = _props.beak,
        path = _props.path;

    var _ref = this.state.plan != null ? this.state.plan : {},
        acc = _ref.acc,
        loc = _ref.loc,
        who = _ref.who;

    var issuedBy = urb.sein !== urb.ship ? '~' + urb.sein : "self";

    if (urb.user !== urb.ship) {
      editButton = null;
      editable = function editable(ref, val, placeholder) {
        return val != null ? val : placeholder;
      };
    } else if (this.state.edit) {
      editButton = button({
        className: 'edit',
        onClick: function onClick() {
          return _this3.saveInfo();
        }
      }, "Save");
      editable = function editable(ref, val, placeholder) {
        return input({
          placeholder: placeholder,
          defaultValue: val,
          ref: _this3.refInput(ref),
          onKeyDown: function onKeyDown(_ref2) {
            var keyCode = _ref2.keyCode;

            if (keyCode === 13) {
              return _this3.saveInfo();
            }
          }
        });
      };
    } else {
      editButton = button({
        className: 'edit',
        onClick: function onClick() {
          return _this3.setState({ edit: true });
        }
      }, "Edit");
      editable = function editable(ref, val, placeholder) {
        var value = val != null ? val : placeholder;
        if (__guard__(_this3.props.plan, function (x) {
          return x[ref];
        }) !== __guard__(_this3.state.plan, function (x1) {
          return x1[ref];
        })) {
          value = rele(_LoadComponent2.default, {});
        }
        return span({
          onClick: function onClick() {
            return _this3.setState({ edit: true, focus: ref });
          }
        }, value);
      };
    }

    if (!_.isEmpty(acc)) {
      accounts = ["Connected to:", div({}, function () {
        var result = [];
        for (var key in acc) {
          var val;
          var _acc$key = acc[key],
              usr = _acc$key.usr,
              url = _acc$key.url;

          if (url == null) {
            val = key + "/" + usr;
          } else {
            val = a({ href: url }, key + "/" + usr);
          }
          result.push(div({ key: key, className: 'service' }, val));
        }
        return result;
      }())];
    } else {
      accounts = "";
    }

    return div({ className: "plan" }, div({ className: "home" }, ""), div({ className: "mono" }, '~' + urb.ship), who != null || this.state.edit ? h6({}, editable('who', who, "Sun Tzu")) : undefined, Grid({ className: "grid" }, ["Location:", editable('loc', loc, "Unknown")], ["Issued by:", a({ href: '//' + urb.sein + '.urbit.org' }, issuedBy)], ["Immutable link:", a({ href: beak + "/web" + path }, beak)], accounts), editButton);
  }
}));


function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = __webpack_require__(4);

var _classnames2 = _interopRequireDefault(_classnames);

var _LoadComponent = __webpack_require__(5);

var _LoadComponent2 = _interopRequireDefault(_LoadComponent);

var _Async = __webpack_require__(1);

var _Async2 = _interopRequireDefault(_Async);

var _Reactify = __webpack_require__(3);

var _Reactify2 = _interopRequireDefault(_Reactify);

var _TreeActions = __webpack_require__(2);

var _TreeActions2 = _interopRequireDefault(_TreeActions);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _ShipComponent = __webpack_require__(6);

var _ShipComponent2 = _interopRequireDefault(_ShipComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recl = React.createClass;
var rele = React.createElement;
var _React$DOM = React.DOM,
    div = _React$DOM.div,
    p = _React$DOM.p,
    h2 = _React$DOM.h2,
    img = _React$DOM.img,
    a = _React$DOM.a,
    form = _React$DOM.form,
    textarea = _React$DOM.textarea,
    input = _React$DOM.input,
    code = _React$DOM.code;


var DEFER_USER = false;

exports.default = (0, _Async2.default)({ comt: 'j', path: 't', spur: 't' }, recl({
  displayName: "Post",
  getInitialState: function getInitialState() {
    return {
      loading: null,
      value: "",
      user: urb.user != null ? urb.user : ""
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    if (!DEFER_USER) {
      return urb.init(function () {
        return _this.setState({ user: urb.user });
      });
    }
  },
  componentDidUpdate: function componentDidUpdate(_props) {
    if (urb.user && !this.state.user) {
      this.setState({ user: urb.user != null ? urb.user : "" });
    }
    if (this.props.comt.length > _props.comt.length) {
      return this.setState({ loading: null });
    }
  },
  onSubmit: function onSubmit(e) {
    var title = this.refs.in.title.value;
    var comment = this.refs.in.comment.value;
    var path = this.props.path || "/"; // XX deal with root path
    _TreeActions2.default.addPost(path, this.props.spur, title, comment);
    return e.preventDefault();
  },
  onChange: function onChange(e) {
    return this.setState({ value: e.target.value });
  },
  render: function render() {
    var _attr = {};
    if (this.state.loading === true) {
      _attr.disabled = "true";
    }
    var titleInput = input(_.create(_attr, {
      type: "text",
      name: "title",
      placeholder: "Title"
    }));
    var bodyTextArea = textarea(_.create(_attr, {
      type: "text",
      name: "comment",
      value: this.state.value,
      onChange: this.onChange
    }));
    var postButton = input(_.create(_attr, {
      type: "submit",
      value: "Post",
      className: "btn btn-primary"
    }));

    return div({}, div({ className: "add-post" }, form({ ref: "in", onSubmit: this.onSubmit }, rele(_ShipComponent2.default, { ship: this.state.user }), titleInput, bodyTextArea, postButton)));
  }
}));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TreeActions = __webpack_require__(2);

var _TreeActions2 = _interopRequireDefault(_TreeActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recl = React.createClass;
var rele = React.createElement;

var waitingScripts = null; // null = none waiting, [] = one in flight, [...] = blocked
var appendNext = function appendNext() {
  if (waitingScripts == null) {
    return;
  }
  if (waitingScripts.length === 0) {
    return waitingScripts = null;
  } else {
    return document.body.appendChild(waitingScripts.shift());
  }
};

// Script eval shim
exports.default = recl({
  displayName: "Script",
  componentDidMount: function componentDidMount() {
    var s = document.createElement('script');
    _.assign(s, this.props);
    _TreeActions2.default.registerScriptElement(s);
    s.onload = appendNext;
    this.js = s;
    if (waitingScripts != null) {
      return waitingScripts.push(s);
    } else {
      waitingScripts = [s];
      return appendNext();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this.js.parentNode === document.body) {
      return document.body.removeChild(this.js);
    }
  },
  render: function render() {
    return rele("script", this.props);
  }
});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Async = __webpack_require__(1);

var _Async2 = _interopRequireDefault(_Async);

var _Reactify = __webpack_require__(3);

var _Reactify2 = _interopRequireDefault(_Reactify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var recl = React.createClass;
var _React$DOM = React.DOM,
    a = _React$DOM.a,
    div = _React$DOM.div,
    input = _React$DOM.input;
exports.default = (0, _Async2.default)({ name: 't', kids: { sect: 'j' }
}, recl({
  hash: null,
  displayName: "Search",
  getInitialState: function getInitialState() {
    return { search: 'wut' };
  },
  onKeyUp: function onKeyUp(e) {
    return this.setState({ search: e.target.value });
  },
  wrap: function wrap(elem, dir, path) {
    var c = void 0,
        ga = void 0,
        gn = void 0;
    if (path.slice(-1) === "/") {
      path = path.slice(0, -1);
    }
    var href = this.props.name + "/" + dir + path;
    if (__guard__(__guard__(elem, function (x1) {
      return x1.ga;
    }), function (x) {
      return x.id;
    })) {
      var _elem = elem;
      gn = _elem.gn;
      ga = _elem.ga;
      c = _elem.c;

      ga = _.clone(ga);
      href += '#' + ga.id;
      delete ga.id;
      elem = { gn: gn, ga: ga, c: c };
    }
    return { gn: 'div', c: [{ gn: 'a', ga: { href: href }, c: [elem] }] };
  },
  render: function render() {
    var _this = this;

    return div({}, input({ onKeyUp: this.onKeyUp, ref: 'inp', defaultValue: 'wut' }), _(this.props.kids).map(function (_ref, dir) {
      var sect = _ref.sect;
      return function () {
        var result = [];
        for (var path in sect) {
          var heds = sect[path];
          result.push(Array.from(heds).map(function (h) {
            return _this.wrap(h, dir, path);
          }));
        }
        return result;
      }();
    }).flatten().flatten().map(this.highlight).filter().take(50).map(_Reactify2.default).value());
  },
  highlight: function highlight(e) {
    var _this2 = this;

    if (!this.state.search) {
      return e;
    }
    var got = false;
    var res = _Reactify2.default.walk(e, function () {
      return null;
    }, function (s) {
      var m = s.split(_this2.state.search);
      if (m[1] == null) {
        return [s];
      }
      var lit = { gn: 'span', c: [_this2.state.search], ga: { style: { background: '#ff6'
          }
        } };
      got = true;
      return [m[0]].concat(_toConsumableArray(_.flatten(function () {
        var result = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Array.from(m.slice(1))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            s = _step.value;
            result.push([lit, s]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return result;
      }())));
    }, function (_ref2) {
      var gn = _ref2.gn,
          ga = _ref2.ga,
          c = _ref2.c;
      return { gn: gn, ga: ga, c: _.flatten(c) };
    });
    if (got) {
      return res;
    }
  }
}));


function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _classnames = __webpack_require__(4);

var _classnames2 = _interopRequireDefault(_classnames);

var _Reactify = __webpack_require__(3);

var _Reactify2 = _interopRequireDefault(_Reactify);

var _Async = __webpack_require__(1);

var _Async2 = _interopRequireDefault(_Async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recl = React.createClass;
var _React$DOM = React.DOM,
    ul = _React$DOM.ul,
    li = _React$DOM.li,
    a = _React$DOM.a;
exports.default = (0, _Async2.default)({
  kids: {
    head: 'r',
    meta: 'j',
    name: 't',
    path: 't',
    bump: 't'
  }
}, recl({
  displayName: "Siblings",
  toText: function toText(elem) {
    return _Reactify2.default.walk(elem, function () {
      return '';
    }, function (s) {
      return s;
    }, function (_ref) {
      var c = _ref.c;
      return (c != null ? c : []).join('');
    });
  },
  render: function render() {
    var _this = this;

    var kids = _util2.default.sortKids(this.props.kids, this.props.meta.navsort);

    var navClas = {
      nav: true,
      'col-md-12': this.props.meta.navmode === 'navbar'
    };
    if (this.props.className) {
      navClas[this.props.className] = true;
    }
    navClas = (0, _classnames2.default)(navClas);

    return ul({ className: navClas }, kids.map(function (_ref2) {
      var head = _ref2.head,
          _ref2$meta = _ref2.meta,
          meta = _ref2$meta === undefined ? {} : _ref2$meta,
          name = _ref2.name,
          path = _ref2.path;

      var selected = name === _this.props.curr;
      if (_this.props.meta.navselect) {
        selected = name === _this.props.meta.navselect;
      }
      var href = _util2.default.basepath(path);
      head = meta.title;
      if (head == null) {
        head = _this.toText(head);
      }
      if (!head) {
        head = name;
      }
      var className = (0, _classnames2.default)({
        "nav-item": true,
        selected: selected
      });
      if (meta.sibsclass) {
        className += ' ' + (0, _classnames2.default)(meta.sibsclass.split(","));
      }
      return li({ className: className, key: name }, a({ className: "nav-link", href: href, onClick: _this.props.closeNav }, head));
    }));
  }
}));

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Async = __webpack_require__(1);

var _Async2 = _interopRequireDefault(_Async);

var _Reactify = __webpack_require__(3);

var _Reactify2 = _interopRequireDefault(_Reactify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var recl = React.createClass;
var div = React.DOM.div;
exports.default = (0, _Async2.default)({ body: 'r' }, recl({
  hash: null,
  displayName: "TableOfContents",

  _click: function _click(id) {
    return function () {
      if (id) {
        return document.location.hash = id;
      }
    };
  },
  componentDidMount: function componentDidMount() {
    this.int = setInterval(this.checkHash, 100);
    this.st = $(window).scrollTop();
    // $(window).on 'scroll',@checkScroll
    return this.$headers = $('#toc').children('h1,h2,h3,h4').filter('[id]');
  },
  checkScroll: function checkScroll() {
    var _this = this;

    var st = $(window).scrollTop();
    if (Math.abs(this.st - st) > 10) {
      var _ret = function () {
        var hash = null;
        _this.st = st;
        return {
          v: function () {
            var result = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = Array.from(_this.$headers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var v = _step.value;

                var item = void 0;
                if (v.tagName === undefined) {
                  continue;
                }
                var $h = $(v);
                var hst = $h.offset().top - $h.outerHeight(true) + 10;
                if (hst < st) {
                  hash = $h.attr('id');
                }
                if (hst > st && hash !== _this.hash && hash !== null) {
                  _this.hash = '#' + hash;
                  document.location.hash = hash;
                  break;
                }
                result.push(item);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            return result;
          }()
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  },
  checkHash: function checkHash() {
    var _this2 = this;

    if (__guard__(document.location.hash, function (x) {
      return x.length;
    }) > 0 && document.location.hash !== this.hash) {
      var _ret2 = function () {
        var hash = document.location.hash.slice(1);
        return {
          v: function () {
            var result = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = Array.from(_this2.$headers)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var v = _step2.value;

                var item = void 0;
                var $h = $(v);
                if (hash === $h.attr('id')) {
                  _this2.hash = document.location.hash;
                  var offset = $h.offset().top - $h.outerHeight(true);
                  setTimeout(function () {
                    return $(window).scrollTop(offset, 10);
                  });
                  break;
                }
                result.push(item);
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            return result;
          }()
        };
      }();

      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    return clearInterval(this.int);
  },
  collectHeader: function collectHeader(_ref) {
    var gn = _ref.gn,
        ga = _ref.ga,
        c = _ref.c;

    var comp = void 0;
    if (this.props.match) {
      comp = gn === this.props.match;
    } else {
      comp = gn && gn[0] === 'h' && parseInt(gn[1]) !== NaN;
    }
    if (comp) {
      ga = _.clone(ga);
      ga.onClick = this._click(ga.id);
      delete ga.id;
      return { gn: gn, ga: ga, c: c };
    }
  },
  parseHeaders: function parseHeaders() {
    if (this.props.body.c) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Array.from(this.props.body.c)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var v = _step3.value;

          if (v.gn === 'div' && __guard__(v.ga, function (x) {
            return x.id;
          }) === "toc") {
            var contents = [{ gn: "h1", ga: { className: "t" }, c: ["Table of contents"] }].concat(_toConsumableArray(_.filter(v.c.map(this.collectHeader))));
            if (this.props.noHeader) {
              contents.shift();
            }
            return {
              gn: "div",
              ga: { className: "toc" },
              c: contents
            };
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  },
  render: function render() {
    return (0, _Reactify2.default)(this.parseHeaders());
  }
}));


function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dedup = {}; // XX wrong layer

var pending = {};
var waspWait = [];

exports.default = {
  refresh: function refresh() {
    return dedup = {};
  },
  get: function get(path, query, cb) {
    if (query == null) {
      query = "no-query";
    }
    var url = _util2.default.basepath(path) + '.tree-json?q=' + this.encode(query);
    if (dedup[url]) {
      return;
    }
    dedup[url] = true;
    pending[url] = true;
    return $.get(url, {}, function (data, status, xhr) {
      // XX on error
      delete pending[url];
      if (urb.wasp != null) {
        var dep = urb.getXHRWasp(xhr);
        urb.sources[dep] = url; // debugging info
        waspWait.push(dep);
        if (_.isEmpty(pending)) {
          waspWait.map(urb.waspData);
          waspWait = [];
        }
      }
      if (cb) {
        return cb(null, data);
      }
    });
  },
  put: function put(data, mark, appl, cb) {
    if (appl == null) {
      appl = /[a-z]*/.exec(mark)[0];
    }
    return urb.init(function () {
      return urb.send(data, { mark: mark, appl: appl }, cb);
    });
  },
  waspElem: function waspElem(a) {
    if (urb.wasp != null) {
      return urb.waspElem(a);
    }
  },
  encode: function encode(obj) {
    var delim = function delim(n) {
      return Array(n + 1).join('_') || '.';
    };
    var _encode = function _encode(obj) {
      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
        return [0, obj];
      }
      var dep = 0;
      var sub = function () {
        var result = [];
        for (var k in obj) {
          var v = obj[k];
          var item = void 0;

          var _encode2 = _encode(v),
              _encode3 = _slicedToArray(_encode2, 2),
              _dep = _encode3[0],
              res = _encode3[1];

          if (_dep > dep) {
            dep = _dep;
          }
          if (res != null) {
            item = k + delim(_dep) + res;
          }
          result.push(item);
        }
        return result;
      }();
      dep++;
      return [dep, sub.join(delim(dep))];
    };
    return _encode(obj)[1];
  }
};

/***/ },
/* 30 */
/***/ function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _scroll = __webpack_require__(11);

var _scroll2 = _interopRequireDefault(_scroll);

var _TreeActions = __webpack_require__(2);

var _TreeActions2 = _interopRequireDefault(_TreeActions);

var _Components = __webpack_require__(9);

var _Components2 = _interopRequireDefault(_Components);

var _TreeComponent = __webpack_require__(10);

var _TreeComponent2 = _interopRequireDefault(_TreeComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
  window.tree.util = _util2.default;

  _scroll2.default.init();

  if (document.location.pathname.substr(-1) !== '/') {
    history.replaceState({}, '', document.location.pathname + '/\n      ' + document.location.search + '\n      ' + document.location.hash);
  }

  // we load modules that may need to send actions up, so we attach
  // the actions to window here.
  window.tree.actions = _TreeActions2.default;

  // reactify has virtual components which themselves need to call
  // reactify.  to do this, we register the components after the fact
  window.tree.actions.addVirtual(_Components2.default);

  var frag = _util2.default.fragpath(window.location.pathname.replace(/\.[^\/]*$/, ''));
  window.tree.actions.setCurr(frag, true);
  window.tree.actions.loadPath(frag, window.tree.data);
  if (window.tree.sein != null) {
    window.tree.actions.loadSein(frag, window.tree.sein);
  }
  window.urb.ondataupdate = function () {
    for (var dat in window.urb.datadeps) {
      window.urb.dewasp(dat);
    }
    return window.tree.actions.clearData();
  };

  var main = React.createFactory(_TreeComponent2.default);
  ReactDOM.render(main({}, ''), document.getElementById('tree'));
  return true;
});

/***/ }
/******/ ]);